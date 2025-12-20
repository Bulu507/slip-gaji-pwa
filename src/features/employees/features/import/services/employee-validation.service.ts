import type { ExcelEmployeeRow } from "../models/import.model"

/**
 * Validasi NIP ganda di dalam file Excel
 * Return list NIP yang duplikat
 */
export function validateDuplicateNip(
  rows: ExcelEmployeeRow[]
): string[] {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const row of rows) {
    if (seen.has(row.nip)) {
      duplicates.add(row.nip)
    }
    seen.add(row.nip)
  }

  return Array.from(duplicates)
}
