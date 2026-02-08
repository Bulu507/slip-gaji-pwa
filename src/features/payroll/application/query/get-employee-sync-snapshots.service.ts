// features/payroll/application/query/get-employee-sync-snapshots.service.ts

import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";
import { PayrollTransactionRepository } from "../../data/repositories/payroll-transaction.repository";
import type { EmployeeSyncSnapshot } from "./employee-sync.dto";

/**
 * Query Service khusus untuk kebutuhan Sinkronisasi Pegawai.
 *
 * - READ ONLY
 * - Tidak mengubah data
 * - Tidak expose domain PayrollTransaction
 * - Menghasilkan DTO EmployeeSyncSnapshot
 */
export class GetEmployeeSyncSnapshotsService {
  private batchRepo = new PayrollBatchRepository();
  private trxRepo = new PayrollTransactionRepository();

  /**
   * Ambil snapshot pegawai berdasarkan data payroll
   * di tahun tertentu (YYYY).
   */
  async execute(year: number): Promise<EmployeeSyncSnapshot[]> {
    const yearPrefix = String(year);

    // 1️⃣ Ambil seluruh batch payroll
    // (sesuai pola GetPayrollBatchesService)
    const allBatches = await this.batchRepo.findAll();

    // 2️⃣ Filter batch GAJI di tahun terpilih
    // Tidak asumsi tipe batch lain
    const gajiBatches = allBatches.filter((batch) =>
      batch.periodeBayar.startsWith(yearPrefix),
    );

    if (gajiBatches.length === 0) {
      throw new Error("Data gaji belum tersedia untuk tahun ini");
    }

    // 3️⃣ Kumpulkan snapshot TERAKHIR per NIP
    const snapshotByNip = new Map<string, EmployeeSyncSnapshot>();

    for (const batch of gajiBatches) {
      // payroll-transaction.repository hanya tahu batchId
      const transactions = await this.trxRepo.findByBatchId(batch.id);

      for (const trx of transactions) {
        const existing = snapshotByNip.get(trx.nip);

        // bandingkan periodeBayar → ambil yang TERBARU
        if (
          !existing ||
          trx.periodeBayar > existing.lastSeenPeriod
        ) {
          snapshotByNip.set(trx.nip, {
            nip: trx.nip,
            nama: trx.nama,
            tipePegawai: batch.tipePegawai,
            lastSeenPeriod: trx.periodeBayar,

            // data turunan dari GAJI
            kdGapok: trx.employeeSnapshot?.kdGapok ?? null,
            kdKawin: trx.employeeSnapshot?.kdKawin ?? null,

            // TUNKIN belum diisi di tahap ini
            grade: null,
          });
        }
      }
    }

    if (snapshotByNip.size === 0) {
      throw new Error("Data gaji belum tersedia untuk tahun ini");
    }

    return Array.from(snapshotByNip.values());
  }
}
