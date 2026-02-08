/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx"
import type { SalaryImportErrorRow } from "../models/salary-import-error.model"

/**
 * Build workbook Excel untuk error import gaji
 * NOTE:
 * - Tidak melakukan download
 * - Return Blob untuk dikontrol caller (modal)
 */
export function buildSalaryImportErrorExcel(
  errors: SalaryImportErrorRow[]
): Blob {
  if (errors.length === 0) {
    throw new Error("Tidak ada data error untuk diexport")
  }

  const sheetData = errors.map((e) => ({
    "Baris Excel": e.rowIndex,
    NIP: e.nip || "-",
    Nama: e.nmpeg || "-",
    "Alasan Error": e.reason,
  }))

  const worksheet = XLSX.utils.json_to_sheet(sheetData)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "Error Import Gaji")

  const arrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  })

  return new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}
