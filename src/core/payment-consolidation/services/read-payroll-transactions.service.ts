import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { PayrollTransaction } from "@/features/payroll/domain/models/payroll-transaction.model";

import type { PaymentSourceTransaction } from "../models/payment-source-transaction.model";

import { PAYMENT_SOURCE } from "@/lib/constants/payment-source.constant";

export async function readPayrollTransactions(): Promise<PaymentSourceTransaction[]> {

  const db = await getPayrollDB();

  const transactions = await db.getAll("payroll_transactions");

  return transactions.map(mapPayrollTransactionToSource);

}

function mapPayrollTransactionToSource(
  tx: PayrollTransaction
): PaymentSourceTransaction {

  return {
    employeeId: tx.nip,

    employeeType: tx.tipePegawai,

    name: tx.nama,

    periode: tx.periodeBayar,

    source: PAYMENT_SOURCE.PAYROLL,

    batchId: tx.batchId,

    total: tx.gajiBersih,

    snapshot: {
      rank: tx.employeeSnapshot?.grade,
      position: tx.employeeSnapshot?.kdGapok,
      unit: undefined,
    },
  };

}