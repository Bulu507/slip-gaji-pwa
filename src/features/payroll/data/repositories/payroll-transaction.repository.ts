// features/payroll/infrastructure/repositories/payroll-transaction.repository.ts
import { getPayrollDB } from "../db/payroll-db";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";

export class PayrollTransactionRepository {
  async saveMany(transactions: PayrollTransaction[]): Promise<void> {
    const db = await getPayrollDB();
    const tx = db.transaction("payroll_transactions", "readwrite");
    const store = tx.store;

    for (const trx of transactions) {
      await store.put(trx);
    }

    await tx.done;
  }

  async deleteByBatchId(batchId: string): Promise<void> {
    const db = await getPayrollDB();
    const index = db
      .transaction("payroll_transactions", "readwrite")
      .store.index("by_batchId");

    const keys = await index.getAllKeys(batchId);

    for (const key of keys) {
      await db.delete("payroll_transactions", key as string);
    }
  }

  async findByBatchId(batchId: string): Promise<PayrollTransaction[]> {
    const db = await getPayrollDB();
    return db.getAllFromIndex(
      "payroll_transactions",
      "by_batchId",
      batchId
    );
  }
}
