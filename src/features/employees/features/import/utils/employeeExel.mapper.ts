import type { ImportedEmployee } from "../models/employee-import.model";

export function mapExcelRow(
  row: Record<string, unknown>,
  rowNumber: number
): ImportedEmployee {
  return {
    rowNumber,
    id: String(row["NIP"] ?? "").trim(),
    name: String(row["Nama"] ?? "").trim(),
    position: String(row["Jabatan"] ?? "").trim(),
    typeUser: String(row["Tipe ASN"] ?? "")
  }
}