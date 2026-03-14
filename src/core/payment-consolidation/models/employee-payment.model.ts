import type { PaymentSource } from "@/lib/constants/payment-source.constant";

export type EmployeePayment = {

  id: string;

  employeeId: string;

  periode: string;

  batchIds: string[];

  // income per source
  sources: Partial<Record<PaymentSource, number>>;

  totalIncome: number;

};