/* eslint-disable @typescript-eslint/no-explicit-any */
// salary-excel-parser.service.ts
import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import * as XLSX from "xlsx"

export async function parseSalaryExcel(
  file: File,
  header: { bulan: number; tahun: number }
): Promise<SalaryRaw[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" })

  if (rows.length === 0) {
    throw new Error("File Excel kosong")
  }

  return rows.map((row) => ({
    ...row,

    // 🔒 INJECT PERIODE DARI HEADER (INI KUNCINYA)
    bulan: header.bulan,
    tahun: header.tahun,

    // angka aman
    gjpokok: Number(row.gjpokok) || 0,
    bersih: Number(row.bersih) || 0,
  })) as SalaryRaw[]
}

