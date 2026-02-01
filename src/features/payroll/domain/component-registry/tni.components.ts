// tni.components.ts
import type { PayrollComponentDef } from "./types";

export const TNI_COMPONENTS: PayrollComponentDef[] = [
  // ===== PENDAPATAN =====
  { kode: "gjpokok", nama: "Gaji Pokok", kelompok: "PENDAPATAN" },
  { kode: "tjistri", nama: "Tunjangan Istri", kelompok: "PENDAPATAN" },
  { kode: "tjanak", nama: "Tunjangan Anak", kelompok: "PENDAPATAN" },
  { kode: "tjupns", nama: "Tunjangan Umum", kelompok: "PENDAPATAN" },
  { kode: "tjstruk", nama: "Tunjangan Struktural", kelompok: "PENDAPATAN" },
  { kode: "tjfungs", nama: "Tunjangan Fungsional", kelompok: "PENDAPATAN" },
  { kode: "tjdaerah", nama: "Tunjangan Daerah", kelompok: "PENDAPATAN" },
  { kode: "tpolwan", nama: "Tunjangan Polwan", kelompok: "PENDAPATAN" },
  { kode: "tjpencil", nama: "Tunjangan Terpencil", kelompok: "PENDAPATAN" },
  { kode: "pembul", nama: "Pembulatan", kelompok: "PENDAPATAN" },
  { kode: "tjberas", nama: "Tunjangan Beras", kelompok: "PENDAPATAN" },
  { kode: "tjpph", nama: "Tunjangan Pajak", kelompok: "PENDAPATAN" },
  { kode: "tlauk", nama: "Tunjangan Lauk", kelompok: "PENDAPATAN" },
  { kode: "tbabin", nama: "Tunjangan Babinsa", kelompok: "PENDAPATAN" },
  { kode: "tbrevet", nama: "Tunjangan Brevet", kelompok: "PENDAPATAN" },
  { kode: "tkhusus", nama: "Tunjangan Khusus", kelompok: "PENDAPATAN" },
  { kode: "tbatas", nama: "Tunjangan Batas", kelompok: "PENDAPATAN" },
  { kode: "tsandi", nama: "Tunjangan Sandi", kelompok: "PENDAPATAN" },

  // ===== POTONGAN =====
  { kode: "potpph", nama: "Potongan PPh", kelompok: "POTONGAN" },
  { kode: "potpfk2", nama: "Potongan PFK 2%", kelompok: "POTONGAN" },
  { kode: "potpfk10", nama: "Potongan PFK 10%", kelompok: "POTONGAN" },
  { kode: "potswrum", nama: "Sewa Rumah", kelompok: "POTONGAN" },
  { kode: "potkelbtj", nama: "Kelebihan Tunjangan", kelompok: "POTONGAN" },
  { kode: "potkelbtj1", nama: "Kelebihan Tunjangan Tambahan", kelompok: "POTONGAN" },
  { kode: "potlain", nama: "Potongan Lainnya", kelompok: "POTONGAN" },
  { kode: "bpjs", nama: "BPJS", kelompok: "POTONGAN" },
  { kode: "bpjs2", nama: "BPJS Tambahan", kelompok: "POTONGAN" },
];
