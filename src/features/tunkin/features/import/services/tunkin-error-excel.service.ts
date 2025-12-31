// features/tunkin/features/import/services/tunkin-error-excel.service.ts

import * as XLSX from "xlsx"
import type { TunkinImportErrorRow } from "../model/tunkin-import-error.model"

export function buildTunkinImportErrorExcel(
  errors: TunkinImportErrorRow[]
): Blob {
  const worksheet = XLSX.utils.json_to_sheet(
    errors.map((e) => ({
      Baris: e.rowIndex,
      NIP: e.nip,
      Nama: e.nama,
      Alasan: e.reason,
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Error Import Tunkin")

  const arrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  })

  return new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}
