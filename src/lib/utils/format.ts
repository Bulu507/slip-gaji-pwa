import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";

/**
 * Format number ke Rupiah (tanpa desimal)
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format periode YYYY-MM ke "Januari 2026"
 */
export function formatPeriode(periode: string): string {
  const [year, month] = periode.split("-").map(Number);
  const label =
    MONTH_OPTIONS.find((m) => m.value === month)?.label ?? month;
  return `${label} ${year}`;
}

/**
 * Format ISO date ke tanggal pendek lokal
 */
export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID");
}
