export type SalaryRaw = {
  // === PERIODE ===
  bulan: number
  tahun: number

  // === IDENTITAS ===
  nip: string
  nmpeg: string
  nogaji: string

  // === KODE ADMINISTRATIF (RAW) ===
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

  // === BANK ===
  npwp: string
  nmrek: string
  nm_bank: string
  rekening: string
  kdbankspan: string
  nmbankspan: string

  // === PENGHASILAN ===
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
  pembul: number
  tjberas: number
  tjpph: number

  // === POTONGAN ===
  potpfkbul: number
  potpfk2: number
  potpfk10: number
  potpph: number
  potswrum: number
  potkelbtj: number
  potlain: number
  pottabrum: number

  // === BPJS & HASIL ===
  bpjs: number
  bpjs2: number
  bersih: number
}
