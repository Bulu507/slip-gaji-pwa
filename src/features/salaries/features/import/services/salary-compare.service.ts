import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import type { SalaryImportPreviewRow } from "../models/salary-import-preview.model"
import { buildPeriodKey } from "@/lib/utils";

/**
 * Bandingkan data import vs existing di localStorage
 * Tambahkan properti `action`: 'new' | 'update' | 'none'
 */
export function compareSalaryPreview(
  rows: SalaryRaw[],
  header: { bulan: number; tahun: number }
): SalaryImportPreviewRow[] {
  const periodKey = buildPeriodKey(header.tahun, header.bulan)
  const storageKey = `salary:${periodKey}`

  const existingRaw: SalaryRaw[] = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey)!)
    : []

  const existingMap = new Map<string, SalaryRaw>()
  for (const item of existingRaw) {
    existingMap.set(item.nip, item)
  }

  return rows.map((row) => {
    const existing = existingMap.get(row.nip)

    let action: "new" | "update" | "none" = "new"

    if (existing) {
      // bandingkan field kunci gaji (gjpokok, bersih)
      if (
        existing.gjpokok !== row.gjpokok ||
        existing.bersih !== row.bersih
      ) {
        action = "update"
      } else {
        action = "none"
      }
    }

    return {
      ...row,
      action,
    }
  })
}
