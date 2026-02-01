// features/payroll/application/query/get-payroll-slip.service.ts
import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";
import { PayrollTransactionRepository } from "../../data/repositories/payroll-transaction.repository";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";

export type PayrollSlip = {
  batch: PayrollBatch;
  transaction: PayrollTransaction;

  pendapatan: PayrollTransaction["components"];
  potongan: PayrollTransaction["components"];

  totalPendapatan: number;
  totalPotongan: number;
};

export class GetPayrollSlipService {
  private batchRepo = new PayrollBatchRepository();
  private trxRepo = new PayrollTransactionRepository();

  async execute(
    batchId: string,
    nip: string
  ): Promise<PayrollSlip> {
    const batch = await this.batchRepo.findById(batchId);
    if (!batch) {
      throw new Error("Batch payroll tidak ditemukan.");
    }

    const transactions = await this.trxRepo.findByBatchId(batchId);
    const trx = transactions.find(t => t.nip === nip);

    if (!trx) {
      throw new Error("Transaksi pegawai tidak ditemukan.");
    }

    const pendapatan = trx.components.filter(
      c => c.kelompok === "PENDAPATAN"
    );

    const potongan = trx.components.filter(
      c => c.kelompok === "POTONGAN"
    );

    const totalPendapatan = pendapatan.reduce(
      (sum, c) => sum + c.nilai,
      0
    );

    const totalPotongan = potongan.reduce(
      (sum, c) => sum + c.nilai,
      0
    );

    return {
      batch,
      transaction: trx,
      pendapatan,
      potongan,
      totalPendapatan,
      totalPotongan,
    };
  }
}
