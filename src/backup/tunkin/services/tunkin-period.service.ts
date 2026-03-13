import type { TunkinPeriod } from "../model/tunkin-period.model"

const STORAGE_KEY = "tunkin-periods"

/**
 * Ambil seluruh periode tunkin
 */
export function getTunkinPeriods(): TunkinPeriod[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  const data: TunkinPeriod[] = raw ? JSON.parse(raw) : []

  return data.sort((a, b) => {
    if (a.tahun !== b.tahun) return b.tahun - a.tahun
    return b.bulan - a.bulan
  })
}

/**
 * Subscribe perubahan localStorage (cross page / tab)
 */
export function subscribeTunkinPeriods(
  callback: (data: TunkinPeriod[]) => void
): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback(getTunkinPeriods())
    }
  }

  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}
