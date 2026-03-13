import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model"

export type TunkinImportMode = "replace" | "update"

export type TunkinImportHeader = {
  bulan: number
  tahun: number
  mode: TunkinImportMode
}

export type TunkinImportResult = {
  totalRow: number
  inserted: number
  updated: number
}

export type TunkinImportPreviewRow = TunkinRaw & {
  action: "new" | "update" | "none"
}
