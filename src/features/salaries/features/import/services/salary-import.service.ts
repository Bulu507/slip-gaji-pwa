// features/salaries/features/import/services/salary-import.service.ts

import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import type {
  SalaryImportHeader,
  SalaryImportResult,
} from "../models/salary-import.model"
import {
  validateDuplicateNipInFile,
  validateSalaryImportHeader,
  validateSalaryPeriodConsistency,
} from "./salary-validation.service"
import type { SalaryPeriod } from "@/features/salaries/models/salary-period.model"

/**
 * Helper key periode: 2025-12
 */
function buildPeriodKey(tahun: number, bulan: number): string {
  return `${tahun}-${String(bulan).padStart(2, "0")}`
}

/**
 * Compare dua data salary (shallow)
 */
function isSalaryChanged(a: SalaryRaw, b: SalaryRaw): boolean {
  return (
    a.total_penghasilan !== b.total_penghasilan ||
    a.total_potongan !== b.total_potongan ||
    a.bersih !== b.bersih
  )
}

/**
 * Import data gaji
 */
export function importSalary(
  header: SalaryImportHeader,
  rows: SalaryRaw[]
): SalaryImportResult {
  // =========================
  // 1. VALIDATION
  // =========================
  validateSalaryImportHeader(header)
  validateDuplicateNipInFile(rows)
  validateSalaryPeriodConsistency(header, rows)

  const { bulan, tahun, mode } = header
  const periodKey = buildPeriodKey(tahun, bulan)
  const storageKey = `salary:${periodKey}`

  // =========================
  // 2. LOAD EXISTING DATA
  // =========================
  const existingRaw: SalaryRaw[] = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey)!)
    : []

  let inserted = 0
  let updated = 0
  let finalData: SalaryRaw[] = []

  // =========================
  // 3. APPLY MODE
  // =========================
  if (mode === "replace") {
    finalData = rows
    inserted = rows.length
  }

  if (mode === "update") {
    const existingMap = new Map<string, SalaryRaw>()

    for (const item of existingRaw) {
      existingMap.set(item.nip, item)
    }

    for (const row of rows) {
      const existing = existingMap.get(row.nip)

      if (!existing) {
        existingMap.set(row.nip, row)
        inserted++
        continue
      }

      if (isSalaryChanged(existing, row)) {
        existingMap.set(row.nip, row)
        updated++
      }
      // jika tidak berubah → biarkan existing
    }

    finalData = Array.from(existingMap.values())
  }

  // =========================
  // 4. SAVE SALARY DATA
  // =========================
  localStorage.setItem(storageKey, JSON.stringify(finalData))

  // =========================
  // 5. UPDATE PERIOD SUMMARY
  // =========================
  const periodStorageKey = "salary-periods"
  const periods: SalaryPeriod[] = localStorage.getItem(periodStorageKey)
    ? JSON.parse(localStorage.getItem(periodStorageKey)!)
    : []

  const totalGajiBersih = finalData.reduce(
    (sum, item) => sum + (item.bersih || 0),
    0
  )

  const periodIndex = periods.findIndex((p) => p.id === periodKey)

  const periodData: SalaryPeriod = {
    id: periodKey,
    bulan,
    tahun,
    totalPegawai: finalData.length,
    totalGajiBersih,
    createdAt: new Date().toISOString(),
  }

  if (periodIndex >= 0) {
    periods[periodIndex] = periodData
  } else {
    periods.push(periodData)
  }

  localStorage.setItem(periodStorageKey, JSON.stringify(periods))

  // =========================
  // 6. RESULT
  // =========================
  return {
    totalRow: rows.length,
    inserted,
    updated,
  }
}
