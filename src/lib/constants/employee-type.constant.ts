/**
 * EmployeeType
 * -----------------------
 * Tipe pegawai yang DIKUNCI oleh sistem.
 *
 * - BUKAN master data
 * - TIDAK bisa dikonfigurasi user
 * - TIDAK berubah oleh import
 * - Digunakan lintas domain (payroll, tunkin, pegawai, slip)
 *
 * Kompatibel dengan:
 * - TypeScript `erasableSyntaxOnly`
 * - Tree-shaking
 * - FE-first (tanpa runtime JS tambahan)
 */

/**
 * Daftar nilai canonical (single source of truth)
 */
export const EMPLOYEE_TYPES = [
  "PNS",
  "PPPK",
  "TNI",
  "NON_ASN",
] as const;

/**
 * Union type dari EMPLOYEE_TYPES
 */
export type EmployeeType = typeof EMPLOYEE_TYPES[number];

/**
 * Optional helper: label tampilan (UI / laporan)
 * Aman karena tidak mempengaruhi model inti
 */
export const EMPLOYEE_TYPE_LABEL: Record<EmployeeType, string> = {
  PNS: "Pegawai Negeri Sipil",
  PPPK: "Pegawai Pemerintah dengan Perjanjian Kerja",
  TNI: "Tentara Nasional Indonesia",
  NON_ASN: "Non ASN",
};

/**
 * Optional helper: guard / validator
 * Berguna saat parsing Excel atau data eksternal
 */
export function isEmployeeType(value: unknown): value is EmployeeType {
  return (
    typeof value === "string" &&
    (EMPLOYEE_TYPES as readonly string[]).includes(value)
  );
}
