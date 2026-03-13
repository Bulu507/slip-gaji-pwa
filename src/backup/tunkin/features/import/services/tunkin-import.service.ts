import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model"
import {
  validateDuplicateNipInFile,
  validateTunkinImportHeader,
  validateTunkinPeriodConsistency,
} from "./tunkin-validation.service"
import type { TunkinPeriod } from "@/features/tunkin/model/tunkin-period.model"
import type { TunkinImportHeader, TunkinImportResult } from "../model/tunkin-import.model"

/**
 * Helper key periode: 2025-12
 */
function buildPeriodKey(tahun: number, bulan: number): string {
  return `${tahun}-${String(bulan).padStart(2, "0")}`
}

/**
 * Compare dua data tunkin (shallow)
 * mengikuti pola salary
 */
function isTunkinChanged(a: TunkinRaw, b: TunkinRaw): boolean {
  return (
    a.nilai_bruto !== b.nilai_bruto ||
    a.nilai_potongan !== b.nilai_potongan ||
    a.nilai_bersih !== b.nilai_bersih ||
    a.tukin_kali !== b.tukin_kali
  )
}

/**
 * Import data tunkin
 */
export function importTunkin(
  header: TunkinImportHeader,
  rows: TunkinRaw[]
): TunkinImportResult {
  // =========================
  // 1. VALIDATION
  // =========================
  validateTunkinImportHeader(header)
  validateDuplicateNipInFile(rows)
  validateTunkinPeriodConsistency(header, rows)

  const { bulan, tahun, mode } = header
  const periodKey = buildPeriodKey(tahun, bulan)
  const storageKey = `tunkin:${periodKey}`

  // =========================
  // 2. LOAD EXISTING DATA
  // =========================
  const existingRaw: TunkinRaw[] = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey)!)
    : []

  let inserted = 0
  let updated = 0
  let finalData: TunkinRaw[] = []

  // =========================
  // 3. APPLY MODE
  // =========================
  if (mode === "replace") {
    finalData = rows
    inserted = rows.length
  }

  if (mode === "update") {
    const existingMap = new Map<string, TunkinRaw>()

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

      if (isTunkinChanged(existing, row)) {
        existingMap.set(row.nip, row)
        updated++
      }
      // tidak berubah → biarkan existing
    }

    finalData = Array.from(existingMap.values())
  }

  // =========================
  // 4. SAVE TUNKIN DATA
  // =========================
  localStorage.setItem(storageKey, JSON.stringify(finalData))

  // =========================
  // 5. UPDATE PERIOD SUMMARY
  // =========================
  const periodStorageKey = "tunkin-periods"
  const periods: TunkinPeriod[] = localStorage.getItem(periodStorageKey)
    ? JSON.parse(localStorage.getItem(periodStorageKey)!)
    : []

  const totalTunkinBersih = finalData.reduce(
    (sum, item) => sum + (item.nilai_bersih || 0),
    0
  )

  const periodIndex = periods.findIndex((p) => p.id === periodKey)

  const periodData: TunkinPeriod = {
    id: periodKey,
    bulan,
    tahun,
    totalPegawai: finalData.length,
    totalTunkinBersih,
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
