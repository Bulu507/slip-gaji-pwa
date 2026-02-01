import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import type { PayrollComponent } from "./payroll-component.model";

export type PayrollTransaction = {
  id: string;

  // ===== RELASI PROSES =====
  batchId: string;
  nomorGaji: string;
  tipePegawai: EmployeeType;

  // ===== IDENTITAS PEGAWAI =====
  nip: string;
  nama: string;

  // ===== SNAPSHOT PEGAWAI (UNTUK SYNC & SLIP) =====
  employeeSnapshot?: {
    // status kepegawaian ringan
    kdGapok?: string;     // kdgapok
    grade?: string;       // kdgol / grade
    kdKawin?: string;     // kdkawin

    // identitas fiskal & pembayaran
    npwp?: string;
    namaRekening?: string;
    nomorRekening?: string;
    namaBank?: string;
  };

  // ===== PERIODE =====
  periodeHak: string;     // YYYY-MM
  periodeBayar: string;   // YYYY-MM

  // ===== NILAI KEBENARAN =====
  gajiBersih: number;

  // ===== DETAIL GAJI =====
  components: PayrollComponent[];

  // ===== AUDIT =====
  importedAt: string;
};
