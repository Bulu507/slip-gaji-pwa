export type ImportMode = "replace" | "update"

/**
 * Bentuk MENTAH dari Excel
 * SESUAI kolom Excel
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
 * Action hasil compare
 */
export type ImportAction = "new" | "update" | "same"

/**
 * Preview data (SUDAH DIMAPPING ke model internal)
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
  action?: ImportAction
}

/**
 * Error import
 */
export type ImportError = {
  type: "DUPLICATE_NIP"
  duplicatedNips: string[]
}
