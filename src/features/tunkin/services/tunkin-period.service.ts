import type { TunkinPeriod } from "../model/tunkin-period.model"

const periods: TunkinPeriod[] = [
  {
    id: "2025-12",
    bulan: 12,
    tahun: 2025,
    totalPegawai: 3,
    totalTunkinBersih: 6203200,
    createdAt: "2024-06-01T10:00:00.000Z",
  },
]

const listeners = new Set<(data: TunkinPeriod[]) => void>()

export function getTunkinPeriods() {
  return periods
}

export function subscribeTunkinPeriods(
  callback: (data: TunkinPeriod[]) => void
) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}
