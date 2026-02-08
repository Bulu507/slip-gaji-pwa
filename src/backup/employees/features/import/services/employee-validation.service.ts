import type { ExcelEmployeeRow } from "../models/employee-import.model"
import type { EmployeeImportError } from "../models/employee-import-error.model"

/**
 * Validasi NIP duplikat di dalam file Excel
 * 1 error = 1 baris
 */
export function validateDuplicateNip(
  rows: ExcelEmployeeRow[]
): EmployeeImportError[] {
  const nipMap = new Map<string, number[]>()

  rows.forEach((row, index) => {
    const rowNumber = index + 2 // header + 1-based
    const nip = row.nip?.trim()

    if (!nip) return

    if (!nipMap.has(nip)) {
      nipMap.set(nip, [])
    }
    nipMap.get(nip)!.push(rowNumber)
  })

  const errors: EmployeeImportError[] = []

  for (const [, rowNumbers] of nipMap.entries()) {
    if (rowNumbers.length > 1) {
      rowNumbers.forEach((row) => {
        errors.push({
          row,
          field: "nip",
          message: `NIP duplikat dengan baris ${rowNumbers
            .filter((r) => r !== row)
            .join(", ")}`
        })
      })
    }
  }

  return errors
}
