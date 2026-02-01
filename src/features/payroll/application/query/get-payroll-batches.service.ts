// features/payroll/application/query/get-payroll-batches.service.ts
import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";

export class GetPayrollBatchesService {
  private repo = new PayrollBatchRepository();

  async execute(): Promise<PayrollBatch[]> {
    // sementara: ambil semua
    // nanti bisa ditambah filter periode / tipe
    return this.repo.findAll();
  }
}
