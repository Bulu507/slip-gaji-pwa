import * as XLSX from "xlsx"
import type { ExcelEmployeeRow } from "../models/import.model"

export function parseEmployeeExcel(file: File): Promise<ExcelEmployeeRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const json = XLSX.utils.sheet_to_json<ExcelEmployeeRow>(worksheet, {
          defval: "",
        })

        resolve(json)
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}
