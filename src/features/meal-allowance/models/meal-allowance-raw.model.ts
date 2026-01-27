export type MealAllowanceRaw = {
  // =========================
  // IDENTITAS PEGAWAI
  // =========================
  nip: string
  nama: string

  // =========================
  // PERIODE (WAJIB ADA DI EXCEL)
  // =========================
  bulan: number
  tahun: number

  // =========================
  // KOMPONEN PERHITUNGAN
  // =========================
  jumlahHari: number | null
  tarif: number | null

  // =========================
  // NILAI FINANSIAL
  // =========================
  bruto: number
  potongan: number
  bersih: number
}
