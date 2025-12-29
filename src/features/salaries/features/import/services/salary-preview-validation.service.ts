import type { SalaryRaw } from "@/features/salaries/models/salary.model";
import { validateDuplicateNipInFile } from "./salary-validation.service";

/**
 * Validasi data preview salary (sebelum compare & simpan)
 * NOTE:
 * - Fokus ke identitas & periode
 * - Tidak validasi field finansial
 */
export function validateSalaryPreview(
  rows: SalaryRaw[],
  header: { bulan: number; tahun: number }
): void {
  if (rows.length === 0) {
    throw new Error("Data gaji kosong");
  }

  // ✅ Tetap: NIP tidak boleh duplikat
  validateDuplicateNipInFile(rows);

  for (const [index, row] of rows.entries()) {
    // === VALIDASI IDENTITAS ===
    if (!row.nip || String(row.nip).trim() === "") {
      throw new Error(`NIP kosong pada baris ke-${index + 1}`);
    }

    // === VALIDASI PERIODE (DEFENSIVE) ===
    const rowBulan = Number(row.bulan);
    const rowTahun = Number(row.tahun);

    const bulanValid = Number.isFinite(rowBulan) && rowBulan >= 1 && rowBulan <= 12;
    const tahunValid = Number.isFinite(rowTahun) && rowTahun > 1900;

    // Jika Excel mengisi bulan/tahun → HARUS cocok header
    if (
      (bulanValid && rowBulan !== header.bulan) ||
      (tahunValid && rowTahun !== header.tahun)
    ) {
      throw new Error(
        `Periode tidak konsisten pada NIP ${row.nip}. ` +
          `Data: ${bulanValid ? String(rowBulan).padStart(2, "0") : "??"}-${tahunValid ? rowTahun : "????"}, ` +
          `Header: ${String(header.bulan).padStart(2, "0")}-${header.tahun}`
      );
    }

    // Jika tidak valid / kosong → dianggap mengikuti header (AMAN)
  }
}
