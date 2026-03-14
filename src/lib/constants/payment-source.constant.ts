export const PAYMENT_SOURCE = {
  PAYROLL: "payroll",
  TUNKIN: "tunkin",
  UANG_MAKAN: "uang_makan",
  LEMBUR: "lembur",
} as const;

export type PaymentSource =
  (typeof PAYMENT_SOURCE)[keyof typeof PAYMENT_SOURCE];