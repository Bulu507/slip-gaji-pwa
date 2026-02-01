// features/payroll/application/query/get-payroll-batch-detail.service.ts
import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";
import { PayrollTransactionRepository } from "../../data/repositories/payroll-transaction.repository";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";

export type PayrollBatchDetail = {
  batch: PayrollBatch;
  transactions: PayrollTransaction[];
};

export class GetPayrollBatchDetailService {
  private batchRepo = new PayrollBatchRepository();
  private trxRepo = new PayrollTransactionRepository();

  async execute(batchId: string): Promise<PayrollBatchDetail> {
    const batch = await this.batchRepo.findById(batchId);
    if (!batch) {
      throw new Error("Batch payroll tidak ditemukan.");
    }

    const transactions = await this.trxRepo.findByBatchId(batchId);

    return { batch, transactions };
  }
}
