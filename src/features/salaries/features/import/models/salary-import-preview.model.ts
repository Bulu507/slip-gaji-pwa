import type { SalaryRaw } from "@/features/salaries/models/salary.model"

/**
 * Status hasil preview import salary
 * - new    : data baru (belum ada di periode)
 * - update : data sudah ada & akan diganti
 */
export type SalaryImportAction = "new" | "update"

/**
 * Row preview salary + status perubahan
 */
export type SalaryImportPreviewRow = SalaryRaw & {
  action: "new" | "update" | "none"
}
