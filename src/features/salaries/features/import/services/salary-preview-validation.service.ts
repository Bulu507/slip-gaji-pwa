import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import { validateDuplicateNipInFile } from "./salary-validation.service"

/**
 * Validasi data preview salary (sebelum compare & simpan)
 */
export function validateSalaryPreview(
  rows: SalaryRaw[],
  header: { bulan: number; tahun: number }
): void {
  if (rows.length === 0) {
    throw new Error("Data gaji kosong")
  }

  validateDuplicateNipInFile(rows)

  for (const row of rows) {
    if (row.bulan !== header.bulan || row.tahun !== header.tahun) {
      throw new Error(
        `Periode tidak konsisten pada NIP ${row.nip}`
      )
    }
  }
}
