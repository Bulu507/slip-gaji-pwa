import type { PaymentSourceTransaction } from "../models/payment-source-transaction.model";
import type { EmployeePayment } from "../models/employee-payment.model";

export function buildEmployeePayments(
  transactions: PaymentSourceTransaction[]
): EmployeePayment[] {

  const paymentMap = new Map<string, EmployeePayment>();

  for (const tx of transactions) {

    const key = `${tx.employeeId}_${tx.periode}`;

    const existing = paymentMap.get(key);

    if (!existing) {

      paymentMap.set(key, {
        id: key,

        employeeId: tx.employeeId,

        periode: tx.periode,

        batchIds: [tx.batchId],

        sources: {
          [tx.source]: tx.total
        },

        totalIncome: tx.total
      });

      continue;
    }

    // update batchIds
    if (!existing.batchIds.includes(tx.batchId)) {
      existing.batchIds.push(tx.batchId);
    }

    // update income per source

    existing.sources[tx.source as keyof typeof existing.sources] =
      (existing.sources[tx.source as keyof typeof existing.sources] || 0) + tx.total;

    // update total income
    existing.totalIncome += tx.total;
  }

  return Array.from(paymentMap.values());
}