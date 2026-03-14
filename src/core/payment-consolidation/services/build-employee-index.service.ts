import type { PaymentSourceTransaction } from "../models/payment-source-transaction.model";
import type { EmployeeIndex } from "../models/employee-index.model";

export function buildEmployeeIndex(
  transactions: PaymentSourceTransaction[]
): EmployeeIndex[] {

  const employeeMap = new Map<string, EmployeeIndex>();

  for (const tx of transactions) {

    const existing = employeeMap.get(tx.employeeId);

    if (!existing) {

      employeeMap.set(tx.employeeId, {
        employeeId: tx.employeeId,
        employeeType: tx.employeeType,
        name: tx.name,

        rank: tx.snapshot?.rank,
        position: tx.snapshot?.position,
        unit: tx.snapshot?.unit,

        sources: [tx.source],

        lastUpdated: new Date().toISOString(),
      });

      continue;
    }

    // update sources jika belum ada
    if (!existing.sources.includes(tx.source)) {
      existing.sources.push(tx.source);
    }

  }

  return Array.from(employeeMap.values());
}