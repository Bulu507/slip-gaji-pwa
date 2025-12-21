export type SalaryImportMode = "replace" | "update"

export type SalaryImportHeader = {
  bulan: number
  tahun: number
  mode: SalaryImportMode
}


export type SalaryImportResult = {
  totalRow: number
  inserted: number
  updated: number
}
