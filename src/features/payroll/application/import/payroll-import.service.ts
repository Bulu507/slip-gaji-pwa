// features/payroll/application/import/payroll-import.service.ts
import { v4 as uuid } from "uuid";

import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";
import { PayrollTransactionRepository } from "../../data/repositories/payroll-transaction.repository";

import { PAYROLL_COMPONENT_REGISTRY } from "../../domain/component-registry";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";

import type {
  PayrollImportInput,
  PayrollImportResult,
} from "./payroll-import.types";
import { PayrollImportError } from "./payroll-import.error";
import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import { parsePNSExcel } from "./parsers/pns.excel-parser";
import { parseTNIExcel } from "./parsers/tni.excel-parser";
import { parsePPPKExcel } from "./parsers/pppk.excel-parser";

/**
 * NOTE:
 * - Excel parser diasumsikan sudah ada (atau stub dulu)
 * - Pegawai TIDAK disentuh di service ini
 */
export class PayrollImportService {
  private batchRepo = new PayrollBatchRepository();
  private trxRepo = new PayrollTransactionRepository();

  async importPayroll(input: PayrollImportInput): Promise<PayrollImportResult> {
    const { file, tipePegawai, periodeBayar, namaBatch } = input;

    // ===============================
    // 0. Validasi input dasar
    // ===============================
    if (!namaBatch?.trim()) {
      throw new PayrollImportError("Nama batch wajib diisi.");
    }

    // ===============================
    // 1. Parse Excel (STUB)
    // ===============================
    const rows = await this.parseExcel(file, tipePegawai);

    if (rows.length === 0) {
      throw new PayrollImportError("File Excel kosong.");
    }

    // ===============================
    // 2. Validasi konsistensi file
    // ===============================
    const uniqueNogaji = new Set(rows.map((r) => r.nogaji));
    if (uniqueNogaji.size !== 1) {
      throw new PayrollImportError(
        "File mengandung lebih dari satu nomor gaji.",
      );
    }

    const nomorGaji = rows[0].nogaji;

    const excelPeriode = this.resolvePeriodeFromExcel(rows[0]);
    if (excelPeriode !== periodeBayar) {
      throw new PayrollImportError(
        `Periode tidak sesuai.
Periode input: ${periodeBayar}
Periode data Excel: ${excelPeriode}`,
      );
    }

    // ===============================
    // 3. Validasi duplikasi batch
    // ===============================
    const exists = await this.batchRepo.existsUniqueKey(
      tipePegawai,
      periodeBayar,
      nomorGaji,
    );

    if (exists) {
      throw new PayrollImportError(
        `Nomor gaji ${nomorGaji} untuk periode ${periodeBayar} (${tipePegawai}) sudah ada.`,
      );
    }

    // ===============================
    // 4. Build batch
    // ===============================
    const batch: PayrollBatch = {
      id: uuid(),
      nomorGaji,
      periodeBayar,
      tipePegawai,
      namaBatch,

      jumlahTransaksi: 0,
      totalNetto: 0,
      createdAt: new Date().toISOString(),
    };

    // ===============================
    // 5. Build transactions
    // ===============================
    const componentRegistry = PAYROLL_COMPONENT_REGISTRY[tipePegawai];
    const transactions: PayrollTransaction[] = [];

    for (const row of rows) {
      const trx = this.buildTransaction(
        row,
        batch,
        componentRegistry,
        tipePegawai,
        periodeBayar,
      );

      transactions.push(trx);
      batch.jumlahTransaksi += 1;
      batch.totalNetto += trx.gajiBersih;
    }

    if (transactions.length === 0) {
      throw new PayrollImportError("Tidak ada transaksi valid untuk disimpan.");
    }

    // ===============================
    // 6. Store (ORDER MATTERS)
    // ===============================
    await this.batchRepo.save(batch);
    await this.trxRepo.saveMany(transactions);

    // ===============================
    // 7. Result
    // ===============================
    return {
      batchId: batch.id,
      jumlahTransaksi: batch.jumlahTransaksi,
      totalNetto: batch.totalNetto,
    };
  }

  // ======================================================
  // ===== Helper (PRIVATE) ===============================
  // ======================================================

  private async parseExcel(
    file: File,
    tipePegawai: EmployeeType,
  ): Promise<any[]> {
    switch (tipePegawai) {
      case "PNS":
        return parsePNSExcel(file);
      case "TNI":
        return parseTNIExcel(file);
      case "PPPK":
        return parsePPPKExcel(file);
      default:
        throw new PayrollImportError(
          `Parser untuk tipe pegawai ${tipePegawai} belum tersedia.`,
        );
    }
  }

  private resolvePeriodeFromExcel(row: any): string {
    const bulan = String(row.bulan).padStart(2, "0");
    return `${row.tahun}-${bulan}`;
  }

  private buildTransaction(
    row: any,
    batch: PayrollBatch,
    componentRegistry: any[],
    tipePegawai: any,
    periodeBayar: string,
  ): PayrollTransaction {
    const components = [];

    for (const def of componentRegistry) {
      const value = Number(row[def.kode]);
      if (value > 0) {
        components.push({
          kode: def.kode,
          nama: def.nama,
          kelompok: def.kelompok,
          nilai: value,
        });
      }
    }

    if (components.length === 0) {
      throw new PayrollImportError(
        `Tidak ada komponen gaji valid untuk NIP ${row.nip}`,
      );
    }

    return {
      id: uuid(),
      batchId: batch.id,
      nomorGaji: batch.nomorGaji,
      tipePegawai,

      nip: row.nip,
      nama: row.nmpeg,

      periodeHak: periodeBayar,
      periodeBayar,

      gajiBersih: Number(row.bersih),

      employeeSnapshot: {
        kdGapok: row.kdgapok,
        grade: row.kdgol,
        kdKawin: row.kdkawin,
        npwp: row.npwp,
        namaRekening: row.nmrek,
        nomorRekening: row.rekening,
        namaBank: row.nm_bank ?? row.nmbankspan,
      },

      components,
      importedAt: new Date().toISOString(),
    };
  }
}
