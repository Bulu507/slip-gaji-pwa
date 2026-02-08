import type { TunkinRaw } from "../model/tunkin.model"

/**
 * Ambil semua data TunkinRaw untuk periode tertentu
 * @param periodId format "YYYY-MM"
 */
export function getTunkinRawsByPeriod(
  periodId: string
): TunkinRaw[] {
  const storageKey = `tunkin:${periodId}`
  const raw = localStorage.getItem(storageKey)
  return raw ? JSON.parse(raw) : []
}

/**
 * Optional: subscribe perubahan TunkinRaw untuk periode tertentu
 */
export function subscribeTunkinRawsByPeriod(
  periodId: string,
  callback: (data: TunkinRaw[]) => void
): () => void {
  const storageKey = `tunkin:${periodId}`

  const handler = (event: StorageEvent) => {
    if (event.key === storageKey) {
      callback(getTunkinRawsByPeriod(periodId))
    }
  }

  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}

/**
 * Async wrapper (paritas dengan salary)
 */
export function getTunkinRawsByPeriodAsync(
  periodId: string
): Promise<TunkinRaw[]> {
  return Promise.resolve(getTunkinRawsByPeriod(periodId))
}
