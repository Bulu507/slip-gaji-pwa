/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import * as XLSX from "xlsx"

export async function parseSalaryExcel(
  file: File,
): Promise<SalaryRaw[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" })

  if (rows.length === 0) {
    throw new Error("File Excel kosong")
  }

  return rows.map((row) => {
    const gjpokok = Number(row.gjpokok || 0)
    const bersih = Number(row.bersih || 0)
    const bulan = Number(row.bulan)   // "01" -> 1, "12" -> 12
    const tahun = Number(row.tahun)

    return {
      ...row,
      gjpokok,
      bersih,
      bulan,
      tahun,
    } as SalaryRaw
  })
}
