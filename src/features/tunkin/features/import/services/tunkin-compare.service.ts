import { buildPeriodKey } from "@/lib/utils"
import type { TunkinImportPreviewRow } from "../model/tunkin-import.model";
import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model";

/**
 * Bandingkan data tunkin import vs existing (localStorage)
 * Tambahkan properti `action`: 'new' | 'update' | 'none'
 */
export function compareTunkinPreview(
  rows: TunkinRaw[],
  header: { bulan: number; tahun: number }
): TunkinImportPreviewRow[] {
  const periodKey = buildPeriodKey(header.tahun, header.bulan)
  const storageKey = `tunkin:${periodKey}`

  const existingRaw: TunkinRaw[] = localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey)!)
    : []

  const existingMap = new Map<string, TunkinRaw>()
  for (const item of existingRaw) {
    existingMap.set(item.nip, item)
  }

  return rows.map((row) => {
    const existing = existingMap.get(row.nip)

    let action: "new" | "update" | "none" = "new"

    if (existing) {
      if (
        existing.nilai_bruto !== row.nilai_bruto ||
        existing.nilai_potongan !== row.nilai_potongan ||
        existing.nilai_bersih !== row.nilai_bersih ||
        existing.kode_grade !== row.kode_grade ||
        existing.nomor_sk !== row.nomor_sk
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
