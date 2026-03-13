// features/salaries/models/salary-import-error.model.ts

export type SalaryImportErrorRow = {
  rowIndex: number      // nomor baris Excel (1-based, termasuk header)
  nip: string
  nmpeg: string
  reason: string        // alasan error (human readable)
}
