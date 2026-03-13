import * as XLSX from "xlsx"
import type { EmployeeImportErrorRow } from "../models/employee-import-error.model"

/**
 * Build Excel dari list error import pegawai
 */
export function buildEmployeeImportErrorExcel(
  errors: EmployeeImportErrorRow[]
): Blob {
  const worksheet = XLSX.utils.json_to_sheet(
    errors.map((e) => ({
      Baris: e.rowIndex,
      NIP: e.nip,
      Nama: e.name,
      Alasan: e.reason,
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Error Import Pegawai")

  const arrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  })

  return new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}
