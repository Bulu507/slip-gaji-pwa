// features/payroll/infrastructure/db/payroll-db.ts
import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";

export interface PayrollDBSchema extends DBSchema {
  payroll_batches: {
    key: string; // id
    value: PayrollBatch;
    indexes: {
      "unique_batch_key": [string, string, string]; // tipePegawai, periodeBayar, nomorGaji
      "by_periodeBayar": string;
      "by_tipePegawai": string;
      "by_createdAt": string;
    };
  };

  payroll_transactions: {
    key: string; // id
    value: PayrollTransaction;
    indexes: {
      "by_batchId": string;
      "by_nip": string;
      "by_periodeBayar": string;
      "by_nip_periodeBayar": [string, string];
    };
  };
}

export const PAYROLL_DB_NAME = "payroll-db";
export const PAYROLL_DB_VERSION = 1;

let dbInstance: IDBPDatabase<PayrollDBSchema> | null = null;

export async function getPayrollDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<PayrollDBSchema>(
    PAYROLL_DB_NAME,
    PAYROLL_DB_VERSION,
    {
      upgrade(db) {
        // payroll_batches
        const batchStore = db.createObjectStore("payroll_batches", {
          keyPath: "id",
        });

        batchStore.createIndex(
          "unique_batch_key",
          ["tipePegawai", "periodeBayar", "nomorGaji"],
          { unique: true }
        );

        batchStore.createIndex("by_periodeBayar", "periodeBayar");
        batchStore.createIndex("by_tipePegawai", "tipePegawai");
        batchStore.createIndex("by_createdAt", "createdAt");

        // payroll_transactions
        const txStore = db.createObjectStore("payroll_transactions", {
          keyPath: "id",
        });

        txStore.createIndex("by_batchId", "batchId");
        txStore.createIndex("by_nip", "nip");
        txStore.createIndex("by_periodeBayar", "periodeBayar");
        txStore.createIndex(
          "by_nip_periodeBayar",
          ["nip", "periodeBayar"]
        );
      },
    }
  );

  return dbInstance;
}
