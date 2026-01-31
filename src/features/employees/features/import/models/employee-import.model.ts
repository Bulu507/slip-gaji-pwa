export type ImportMode = "replace" | "update"

/**
 * Bentuk MENTAH dari Excel
 */
export type ExcelEmployeeRow = {
  nip: string
  nama: string
  golongan: string
  nama_golongan: string
  jabatan: string
  kdgapok: string
  kdkawin: string
  posisi: string
  unit: string
  tipe: string
}

/**
 * Action hasil compare (HANYA untuk mode update)
 */
export type ImportAction = "new" | "update" | "same"

/**
 * Preview data import pegawai
 */
export type PreviewEmployee = {
  nip: string
  name: string
  grade: string
  gradeName: string
  jobTitle: string
  baseSalaryCode: string
  maritalStatusCode: string
  position: string
  unit: string
  employmentType: string

  /** hanya ada saat mode = update */
  action?: ImportAction
}
