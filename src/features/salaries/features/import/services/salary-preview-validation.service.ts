import type { SalaryRaw } from "@/features/salaries/models/salary.model";
import { validateDuplicateNipInFile } from "./salary-validation.service";

/**
 * Validasi data preview salary (sebelum compare & simpan)
 */
export function validateSalaryPreview(
  rows: SalaryRaw[],
  header: { bulan: number; tahun: number }
): void {
  if (rows.length === 0) {
    throw new Error("Data gaji kosong");
  }

  validateDuplicateNipInFile(rows);

  for (const row of rows) {
    const rowBulan = Number(row.bulan);
    const rowTahun = Number(row.tahun);

    if (rowBulan !== header.bulan || rowTahun !== header.tahun) {
      throw new Error(
        `Periode tidak konsisten pada NIP ${row.nip}. Data: ${String(
          rowBulan
        ).padStart(2, "0")}-${rowTahun}, Header: ${String(
          header.bulan
        ).padStart(2, "0")}-${header.tahun}`
      );
    }
  }

  // // Optional: cek jumlah kolom sesuai SalaryRaw
  // const salaryRawKeys = [
  //   "nip",
  //   "nmpeg",
  //   "gjpokok",
  //   "bersih",
  //   "bulan",
  //   "tahun",
  //   "tjistri",
  //   "tjanak",
  //   "tjupns",
  //   "tjstruk",
  //   "tjfungs",
  //   "tjdaerah",
  //   "tjpencil",
  //   "tjlain",
  //   "tjkompen",
  //   "pembul",
  //   "tjberas",
  //   "tjpph",
  //   "potpfkbul",
  //   "potpfk2",
  //   "potpfk10",
  //   "potpph",
  //   "potswrum",
  //   "potkelbtj",
  //   "potlain",
  //   "pottabrum",
  //   "sandi",
  //   "kdkawin",
  //   "kdjab",
  //   "thngj",
  //   "kdgapok",
  //   "bpjs",
  //   "bpjs2",
  // ];

  // for (const row of rows) {
  //   const rowKeys = Object.keys(row);
  //   if (rowKeys.length < salaryRawKeys.length) {
  //     throw new Error(
  //       `Format salah: jumlah kolom tidak sesuai pada NIP ${row.nip}`
  //     );
  //   }
  // }
}
