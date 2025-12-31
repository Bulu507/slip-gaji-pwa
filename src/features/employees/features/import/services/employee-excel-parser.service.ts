import * as XLSX from "xlsx"
import type { ExcelEmployeeRow } from "../models/employee-import.model"

/**
 * Parse file Excel pegawai menjadi data mentah (raw)
 * TANPA validasi bisnis
 */
export function parseEmployeeExcel(
  file: File
): Promise<ExcelEmployeeRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const rawRows = XLSX.utils.sheet_to_json<ExcelEmployeeRow>(
          worksheet,
          { defval: "" }
        )

        // normalisasi ringan (trim + buang baris kosong)
        const rows = rawRows
          .map((row) => ({
            nip: row.nip.trim(),
            nama: row.nama.trim(),
            golongan: row.golongan.trim(),
            nama_golongan: row.nama_golongan.trim(),
            jabatan: row.jabatan.trim(),
            kdgapok: row.kdgapok.trim(),
            kdkawin: row.kdkawin.trim(),
            posisi: row.posisi.trim(),
            unit: row.unit.trim(),
            tipe: row.tipe.trim(),
          }))
          .filter((row) => row.nip !== "")

        resolve(rows)
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}
