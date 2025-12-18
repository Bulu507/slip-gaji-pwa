import * as XLSX from "xlsx";
import { mapExcelRow } from "../utils/employeeExcel.mapper";
import type { ImportedEmployee } from "../models/employee-import.model";

export function parseEmployeeExcel(file: File): Promise<ImportedEmployee[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

      resolve(rows.map((row, i) => mapExcelRow(row, i + 2)));
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
