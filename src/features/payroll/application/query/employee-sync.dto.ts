import type { EmployeeType } from "@/lib/constants/employee-type.constant";

export interface EmployeeSyncSnapshot {
  nip: string;
  nama: string;
  tipePegawai: EmployeeType;

  // periode pembayaran terakhir (YYYY-MM)
  lastSeenPeriod: string;

  // dari GAJI
  kdGapok?: string | null;
  kdKawin?: string | null;

  // dari TUNKIN
  grade?: string | null;
}
