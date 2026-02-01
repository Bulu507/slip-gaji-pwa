// features/payroll/application/import/payroll-import.types.ts
import type { EmployeeType } from "@/lib/constants/employee-type.constant";

export type PayrollImportInput = {
  file: File;                 // Excel file
  tipePegawai: EmployeeType;
  periodeBayar: string;       // YYYY-MM
  namaBatch: string;          // WAJIB
};

export type PayrollImportResult = {
  batchId: string;
  jumlahTransaksi: number;
  totalNetto: number;
};
