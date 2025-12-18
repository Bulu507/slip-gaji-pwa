import type { ImportedEmployee } from "../models/employee-import.model";

export function mapExcelRow(
  row: Record<string, unknown>,
  rowNumber: number
): ImportedEmployee {
  return {
    id: String(row["nip"] ?? "").trim(),
    name: String(row["nama"] ?? "").trim(),
    position: String(row["jabatan"] ?? "").trim(),
    typeUser: String(row["tipe_user"] ?? "").trim(),
    rowNumber,
  };
}
