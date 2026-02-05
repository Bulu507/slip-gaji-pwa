/**
 * Helper untuk membuat key unik periode gaji
 * Contoh: 2025-12
 */
export function buildPeriodKey(tahun: number, bulan: number): string {
  return `${tahun}-${String(bulan).padStart(2, "0")}`;
}
