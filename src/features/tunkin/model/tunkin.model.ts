export type TunkinRaw = {
  id: string
  nip: string
  nama: string
  kode_grade: string
  nomor_sk: string

  // =====================
  // PERIODE BARIS (EXCEL)
  // kolom B & C
  // =====================
  bulan: number
  tahun: number

  // =====================
  // NILAI
  // =====================
  nilai_bruto: number
  nilai_potongan: number
  nilai_bersih: number

  // =====================
  // BANK
  // =====================
  kode_bank_span: string
  nama_bank: string
  nomor_rekening: string
  nama_rekening: string

  // =====================
  // PERIODE HEADER / SK
  // =====================
  periode_awal_bulan: number
  periode_awal_tahun: number
  periode_akhir_bulan: number
  periode_akhir_tahun: number

  tukin_kali: number
  nomor_tukin_lama?: string
  nomor_tukin_baru?: string
}
