import type { SalaryRaw } from "../models/salary.model"

/**
 * Ambil semua data SalaryRaw untuk periode tertentu
 * @param periodId format "YYYY-MM"
 */
export function getSalaryRawsByPeriod(periodId: string): SalaryRaw[] {
  const storageKey = `salary:${periodId}`
  const raw = localStorage.getItem(storageKey)
  return raw ? JSON.parse(raw) : []
}

/**
 * Optional: subscribe perubahan SalaryRaw untuk periode tertentu
 */
export function subscribeSalaryRawsByPeriod(
  periodId: string,
  callback: (data: SalaryRaw[]) => void
): () => void {
  const storageKey = `salary:${periodId}`

  const handler = (event: StorageEvent) => {
    if (event.key === storageKey) {
      callback(getSalaryRawsByPeriod(periodId))
    }
  }

  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}

export function getSalaryRawsByPeriodAsync(periodId: string): Promise<SalaryRaw[]> {
  return Promise.resolve(getSalaryRawsByPeriod(periodId))
}

