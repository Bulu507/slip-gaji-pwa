// pppk.components.ts
import type { PayrollComponentDef } from "./types";

export const PPPK_COMPONENTS: PayrollComponentDef[] = [
  // ===== PENDAPATAN =====
  { kode: "gjpokok", nama: "Gaji Pokok", kelompok: "PENDAPATAN" },
  { kode: "tjistri", nama: "Tunjangan Istri", kelompok: "PENDAPATAN" },
  { kode: "tjanak", nama: "Tunjangan Anak", kelompok: "PENDAPATAN" },
  { kode: "tjupns", nama: "Tunjangan Umum", kelompok: "PENDAPATAN" },
  { kode: "tjstruk", nama: "Tunjangan Struktural", kelompok: "PENDAPATAN" },
  { kode: "tjfungs", nama: "Tunjangan Fungsional", kelompok: "PENDAPATAN" },
  { kode: "tjdaerah", nama: "Tunjangan Daerah", kelompok: "PENDAPATAN" },
  { kode: "tjpencil", nama: "Tunjangan Terpencil", kelompok: "PENDAPATAN" },
  { kode: "tjlain", nama: "Tunjangan Lainnya", kelompok: "PENDAPATAN" },
  { kode: "tjkompen", nama: "Tunjangan Kompensasi", kelompok: "PENDAPATAN" },
  { kode: "pembul", nama: "Pembulatan", kelompok: "PENDAPATAN" },
  { kode: "tjberas", nama: "Tunjangan Beras", kelompok: "PENDAPATAN" },
  { kode: "tjpph", nama: "Tunjangan Pajak", kelompok: "PENDAPATAN" },

  // ===== POTONGAN =====
  { kode: "potpfkbul", nama: "Potongan PFK Bulanan", kelompok: "POTONGAN" },
  { kode: "potpfk2", nama: "Potongan PFK 2%", kelompok: "POTONGAN" },
  { kode: "potpfk10", nama: "Potongan PFK 10%", kelompok: "POTONGAN" },
  { kode: "potpph", nama: "Potongan PPh", kelompok: "POTONGAN" },
  { kode: "potlain", nama: "Potongan Lainnya", kelompok: "POTONGAN" },
  { kode: "bpjs", nama: "BPJS", kelompok: "POTONGAN" },
  { kode: "bpjs2", nama: "BPJS Tambahan", kelompok: "POTONGAN" },
];
