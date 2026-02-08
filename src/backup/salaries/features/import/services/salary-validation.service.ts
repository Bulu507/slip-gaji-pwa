// features/salaries/features/import/services/salary-validation.service.ts

import type { SalaryImportHeader } from "../models/salary-import.model"
import type { SalaryRaw } from "../../../models/salary.model"

/**
 * Validasi header import (bulan & tahun)
 */
export function validateSalaryImportHeader(
  header: SalaryImportHeader
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
  rows: SalaryRaw[]
): void {
  const nipSet = new Set<string>()

  for (const row of rows) {
    if (!row.nip) {
      throw new Error("NIP kosong ditemukan pada data gaji")
    }

    if (nipSet.has(row.nip)) {
      throw new Error(`Duplikasi NIP ditemukan: ${row.nip}`)
    }

    nipSet.add(row.nip)
  }
}

/**
 * Validasi konsistensi periode data vs header
 * (bulan & tahun di baris harus sama dengan header)
 */
export function validateSalaryPeriodConsistency(
  header: SalaryImportHeader,
  rows: SalaryRaw[]
): void {
  const { bulan, tahun } = header

  for (const row of rows) {
    if (row.bulan !== bulan || row.tahun !== tahun) {
      throw new Error(
        `Data gaji NIP ${row.nip} tidak sesuai periode ${bulan}-${tahun}`
      )
    }
  }
}
