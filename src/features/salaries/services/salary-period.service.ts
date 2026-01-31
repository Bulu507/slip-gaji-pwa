import type { SalaryPeriod } from "../models/salary-period.model"

const STORAGE_KEY = "salary-periods"

/**
 * Ambil seluruh periode gaji
 */
export function getSalaryPeriods(): SalaryPeriod[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  const data: SalaryPeriod[] = raw ? JSON.parse(raw) : []

  return data.sort((a, b) => {
    if (a.tahun !== b.tahun) return b.tahun - a.tahun
    return b.bulan - a.bulan
  })
}

/**
 * Subscribe perubahan localStorage (cross page / tab)
 */
export function subscribeSalaryPeriods(
  callback: (data: SalaryPeriod[]) => void
): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback(getSalaryPeriods())
    }
  }

  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}
