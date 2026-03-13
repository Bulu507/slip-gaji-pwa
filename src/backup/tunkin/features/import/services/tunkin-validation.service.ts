import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model"

/**
 * Validasi header import (bulan & tahun)
 */
export function validateTunkinImportHeader(
  header: { bulan: number; tahun: number }
): void {
  const { bulan, tahun } = header

  if (!bulan || bulan < 1 || bulan > 12) {
    throw new Error("Bulan tidak valid")
  }

  if (!tahun || tahun < 2000) {
    throw new Error("Tahun tidak valid")
  }
}

/**
 * Validasi duplikasi NIP di dalam 1 file Excel
 */
export function validateDuplicateNipInFile(
  rows: TunkinRaw[]
): void {
  const nipSet = new Set<string>()

  for (const row of rows) {
    if (!row.nip) {
      throw new Error("NIP kosong ditemukan pada data tunkin")
    }

    if (nipSet.has(row.nip)) {
      throw new Error(`Duplikasi NIP ditemukan: ${row.nip}`)
    }

    nipSet.add(row.nip)
  }
}

/**
 * Validasi konsistensi periode data vs header
 */
export function validateTunkinPeriodConsistency(
  header: { bulan: number; tahun: number },
  rows: TunkinRaw[]
): void {
  const { bulan, tahun } = header

  for (const row of rows) {
    if (row.bulan !== bulan || row.tahun !== tahun) {
      throw new Error(
        `Data tunkin NIP ${row.nip} tidak sesuai periode ${bulan}-${tahun}`
      )
    }
  }
}
