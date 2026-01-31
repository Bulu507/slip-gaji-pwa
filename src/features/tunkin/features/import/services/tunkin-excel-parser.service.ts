/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx"
import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model"

const num = (v: any): number => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const str = (v: any): string => {
  return v == null ? "" : String(v).trim()
}

export async function parseTunkinExcel(
  file: File
): Promise<TunkinRaw[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json<any[]>(sheet, {
    header: 1,
    defval: "",
  })

  if (rows.length === 0) {
    throw new Error("File Excel kosong")
  }

  return rows.map((row, index): TunkinRaw => {
    const bulan = num(row[1])
    const tahun = num(row[2])
    const nip = str(row[3])

    return {
      id: `${nip}-${bulan}-${tahun}-${index}`,

      // =====================
      // IDENTITAS
      // =====================
      nip,
      bulan,
      tahun,
      nama: str(row[4]),
      nomor_sk: str(row[5]),
      kode_grade: str(row[6]),

      // =====================
      // NILAI
      // =====================
      nilai_bruto: num(row[7]),
      nilai_potongan: num(row[8]),
      nilai_bersih:
        row[9] !== ""
          ? num(row[9])
          : num(row[7]) - num(row[8]),

      // =====================
      // BANK
      // =====================
      kode_bank_span: str(row[10]),
      nama_bank: str(row[11]),
      nomor_rekening: str(row[12]),
      nama_rekening: str(row[13]),

      // =====================
      // PERIODE SK
      // =====================
      periode_awal_bulan: num(row[14]),
      periode_awal_tahun: num(row[15]),
      periode_akhir_bulan: num(row[16]),
      periode_akhir_tahun: num(row[17]),

      // =====================
      // LAINNYA
      // =====================
      tukin_kali: num(row[18]),
      nomor_tukin_lama: str(row[19]) || undefined,
      nomor_tukin_baru: str(row[20]) || undefined,
    }
  })
}
