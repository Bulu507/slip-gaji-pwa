import type { Employee } from "../models/employee.model"

// tipe khusus untuk baris Excel
export interface EmployeeExcelRow {
  NIP?: string
  Nama?: string
  Jabatan?: string
  Pangkat?: string
  "Kode Gaji"?: string
  "Tgl KGB Terakhir"?: string
  Direktorat?: string
  "Tipe ASN"?: string
}

// mapping row Excel → Employee
export function mapExcelRowToEmployee(row: EmployeeExcelRow): Employee {
  return {
    id: (row.NIP ?? "").trim(),
    name: row.Nama ?? "",
    position: row.Jabatan ?? "",
    grade: row.Pangkat ?? "",
    salaryCode: row["Kode Gaji"] ?? "",
    lastKgbDate: row["Tgl KGB Terakhir"] ?? "",
    directorate: row.Direktorat ?? "",
    asnType: row["Tipe ASN"] ?? "",
  }
}
