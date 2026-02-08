import type { EmployeeType } from "@/lib/constants/employee-type.constant";

export interface Employee {
  // identity (scope: 1 tahun)
  id_pegawai: string;        // UUID v4, unik per tahun
  nip: string;               // NIP / NRP (unique per tahun)
  nama: string;
  tipe_pegawai: EmployeeType;

  // snapshot hasil sinkronisasi (AUTO)
  kd_gapok_terakhir?: string | null;   // dari gaji
  grade_terakhir?: string | null;      // dari tunkin
  kd_kawin?: string | null;             // PNS & PPPK saja

  // metadata sync
  last_seen_period?: string | null;     // hasil buildPeriode()
  last_sync_at: string;                 // ISO datetime

  // additional (editable, TIDAK diubah sync)
  nik?: string | null;
  npwp?: string | null;
  unit?: string | null;
  kd_bag?: string | null;
  kd_subbag?: string | null;
  jabatan?: string | null;
  label_internal?: string | null;

  created_at: string;
  updated_at: string;
}
