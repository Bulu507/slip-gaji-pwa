// features/payroll/application/command/delete-payroll-batch.service.ts
import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";
import { PayrollTransactionRepository } from "../../data/repositories/payroll-transaction.repository";

export class DeletePayrollBatchService {
  private batchRepo = new PayrollBatchRepository();
  private trxRepo = new PayrollTransactionRepository();

  async execute(batchId: string): Promise<void> {
    // 1. Pastikan batch ada
    const batch = await this.batchRepo.findById(batchId);
    if (!batch) {
      throw new Error("Batch payroll tidak ditemukan.");
    }

    // 2. Audit guard (future-proof)
    if ((batch as any).isLocked) {
      throw new Error(
        "Batch sudah dikunci dan tidak dapat dihapus."
      );
    }

    // 3. Delete transaksi dulu (WAJIB URUTAN)
    await this.trxRepo.deleteByBatchId(batchId);

    // 4. Delete batch
    await this.batchRepo.deleteById(batchId);
  }
}
