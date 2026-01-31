import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model"
import type { SalaryImportErrorRow } from "@/features/salaries/features/import/models/salary-import-error.model"
import { validateDuplicateNipInFile } from "./tunkin-validation.service"
import { getEmployees } from "@/features/employees/services/employee-storage.service"

export function validateTunkinPreview(
  rows: TunkinRaw[],
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
          reason: "Data tunkin kosong",
        },
      ],
    }
  }

  // =========================
  // DUPLICATE NIP (HARD STOP)
  // =========================
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
    const rowIndex = index + 1 // tanpa header excel

    // NIP kosong
    if (!row.nip || row.nip.trim() === "") {
      errors.push({
        rowIndex,
        nip: "",
        nmpeg: row.nama,
        reason: "NIP kosong",
      })
      return
    }

    // Pegawai belum terdaftar
    if (!employeeSet.has(row.nip)) {
      errors.push({
        rowIndex,
        nip: row.nip,
        nmpeg: row.nama,
        reason: "Pegawai belum terdaftar",
      })
    }

    // Periode tidak konsisten
    const bulanValid =
      Number.isFinite(row.bulan) &&
      row.bulan >= 1 &&
      row.bulan <= 12

    const tahunValid =
      Number.isFinite(row.tahun) &&
      row.tahun > 1900

    if (
      (bulanValid && row.bulan !== header.bulan) ||
      (tahunValid && row.tahun !== header.tahun)
    ) {
      errors.push({
        rowIndex,
        nip: row.nip,
        nmpeg: row.nama,
        reason: `Periode tidak konsisten (${row.bulan || "??"}-${row.tahun || "????"})`,
      })
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}
