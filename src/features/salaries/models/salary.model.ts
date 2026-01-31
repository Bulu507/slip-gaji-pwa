export type SalaryRaw = {
  // =============================
  // PERIODE GAJI
  // =============================
  bulan: number
  tahun: number
  nogaji: string

  // =============================
  // IDENTITAS PEGAWAI
  // =============================
  nip: string
  nmpeg: string

  // =============================
  // KODE ADMINISTRATIF (MENTAH)
  // =============================
  kdsatker: string
  kdanak: string
  kdsubanak: string
  kdjns: string
  kdduduk: string
  kdgol: string
  kdjab: string
  kdkawin: string
  thngj: string
  kdgapok: string
  sandi: string

  // =============================
  // DATA BANK
  // =============================
  npwp: string
  nmrek: string
  nm_bank: string
  rekening: string
  kdbankspan: string
  nmbankspan: string

  // =============================
  // PENGHASILAN UMUM (PNS / PPPK)
  // =============================
  gjpokok: number
  tjistri: number
  tjanak: number
  tjupns: number
  tjstruk: number
  tjfungs: number
  tjdaerah: number
  tjpencil: number
  tjlain: number
  tjkompen: number
  tjberas: number
  tjpph: number
  pembul: number

  // =============================
  // PENGHASILAN KHUSUS TNI
  // =============================
  tlauk: number
  tkowan: number
  tpolwan: number
  tbabin: number
  tsandi: number
  tbrevet: number
  tkhusus: number
  tbatas: number

  // =============================
  // POTONGAN
  // =============================
  potpfkbul: number
  potpfk2: number
  potpfk10: number
  potpph: number
  potswrum: number
  potkelbtj: number
  potlain: number
  pottabrum: number

  // =============================
  // BPJS
  // =============================
  bpjs: number
  bpjs2: number

  // =============================
  // TOTAL & HASIL
  // =============================
  total_penghasilan: number
  total_potongan: number
  bersih: number
}
