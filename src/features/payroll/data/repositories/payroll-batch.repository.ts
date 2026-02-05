// features/payroll/infrastructure/repositories/payroll-batch.repository.ts
import { getPayrollDB } from "../db/payroll-db";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import type { EmployeeType } from "@/lib/constants/employee-type.constant";

export class PayrollBatchRepository {
  async existsUniqueKey(
    tipePegawai: EmployeeType,
    periodeBayar: string,
    nomorGaji: string,
  ): Promise<boolean> {
    const db = await getPayrollDB();
    const index = db
      .transaction("payroll_batches")
      .store.index("unique_batch_key");

    const key: [string, string, string] = [
      tipePegawai,
      periodeBayar,
      nomorGaji,
    ];

    const result = await index.getKey(key);
    return !!result;
  }

  async save(batch: PayrollBatch): Promise<void> {
    const db = await getPayrollDB();
    await db.put("payroll_batches", batch);
  }

  async deleteById(batchId: string): Promise<void> {
    const db = await getPayrollDB();
    await db.delete("payroll_batches", batchId);
  }

  async findByPeriode(periodeBayar: string): Promise<PayrollBatch[]> {
    const db = await getPayrollDB();
    return db.getAllFromIndex(
      "payroll_batches",
      "by_periodeBayar",
      periodeBayar,
    );
  }

  async findAll(): Promise<PayrollBatch[]> {
    const db = await getPayrollDB();
    return db.getAll("payroll_batches");
  }

  async findById(id: string) {
    const db = await getPayrollDB();
    return db.get("payroll_batches", id);
  }

  async findByPeriodeAndTipe(
    periodeBayar: string,
    tipePegawai?: EmployeeType,
  ): Promise<PayrollBatch[]> {
    const db = await getPayrollDB();

    // step 1: ambil by periode (index)
    const batches = await db.getAllFromIndex(
      "payroll_batches",
      "by_periodeBayar",
      periodeBayar,
    );

    // step 2: filter tipe (jika ada)
    const filtered = tipePegawai
      ? batches.filter((b) => b.tipePegawai === tipePegawai)
      : batches;

    // step 3: sort by createdAt desc (UX + audit)
    return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}
