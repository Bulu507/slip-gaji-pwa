import type { EmployeeType } from "@/lib/constants/employee-type.constant";

export type PayrollBatch = {
  id: string;

  nomorGaji: string;
  periodeBayar: string;       // YYYY-MM
  tipePegawai: EmployeeType;

  // ⬇️ BARU (opsional, input user)
  namaBatch?: string;         // contoh: "Kekurangan Jan 2026"

  jumlahTransaksi: number;
  totalNetto: number;

  parentBatchId?: string;
  parentNomorGaji?: string;

  createdAt: string;
};

