import * as XLSX from "xlsx";
import type { ExcelEmployeeRow } from "../models/import.model";

export async function parseExcelFile(
  file: File
): Promise<ExcelEmployeeRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const json = XLSX.utils.sheet_to_json<ExcelEmployeeRow>(sheet, {
    defval: "",
  });

  return json.map((row) => ({
    nip: String(row.nip).trim(),
    name: String(row.name).trim(),
    position: String(row.position).trim(),
    unit: String(row.unit).trim(),
    type: String(row.type).trim(),
  }));
}
