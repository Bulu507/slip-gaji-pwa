export type ImportMode = "replace" | "update"

export type ExcelEmployeeRow = {
  nip: string
  name: string
  position: string
  unit: string
  type: string
}

export type ImportAction = "new" | "update" | "same"

export type PreviewEmployee = ExcelEmployeeRow & {
  action?: ImportAction
}

/** Error khusus import */
export type ImportError = {
  type: "DUPLICATE_NIP"
  duplicatedNips: string[]
}
