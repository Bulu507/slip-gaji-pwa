// features/salaries/services/salary-preview-validation.service.ts

import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import type { SalaryImportErrorRow } from "../models/salary-import-error.model"
import { validateDuplicateNipInFile } from "./salary-validation.service"
import { getEmployees } from "@/features/employees/services/employee-storage.service"

export function validateSalaryPreview(
  rows: SalaryRaw[],
  header: { bulan: number; tahun: number }
): {
  isValid: boolean
  errors: SalaryImportErrorRow[]
} {
  const errors: SalaryImportErrorRow[] = []

  // =========================
  // EMPTY FILE
  // =========================
  if (rows.length === 0) {
    return {
      isValid: false,
      errors: [
        {
          rowIndex: 0,
          nip: "",
          nmpeg: "",
          reason: "Data gaji kosong",
        },
      ],
    }
  }

  // =========================
  // DUPLICATE NIP (HARD STOP)
  // =========================
  // masih throw → dianggap error fatal file
  validateDuplicateNipInFile(rows)

  // =========================
  // LOAD EMPLOYEE MASTER
  // =========================
  const employees = getEmployees()
  const employeeSet = new Set(employees.map((e) => e.nip))

  // =========================
  // ROW VALIDATION
  // =========================
  rows.forEach((row, index) => {
    const rowIndex = index + 2 // header excel = row 1

    // NIP kosong
    if (!row.nip || row.nip.trim() === "") {
      errors.push({
        rowIndex,
        nip: "",
        nmpeg: row.nmpeg,
        reason: "NIP kosong",
      })
      return
    }

    // Pegawai belum terdaftar
    if (!employeeSet.has(row.nip)) {
      errors.push({
        rowIndex,
        nip: row.nip,
        nmpeg: row.nmpeg,
        reason: "Pegawai belum terdaftar",
      })
    }

    // Periode tidak konsisten
    const rowBulan = Number(row.bulan)
    const rowTahun = Number(row.tahun)

    const bulanValid = Number.isFinite(rowBulan) && rowBulan >= 1 && rowBulan <= 12
    const tahunValid = Number.isFinite(rowTahun) && rowTahun > 1900

    if (
      (bulanValid && rowBulan !== header.bulan) ||
      (tahunValid && rowTahun !== header.tahun)
    ) {
      errors.push({
        rowIndex,
        nip: row.nip,
        nmpeg: row.nmpeg,
        reason: `Periode tidak konsisten (${rowBulan || "??"}-${rowTahun || "????"})`,
      })
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}
