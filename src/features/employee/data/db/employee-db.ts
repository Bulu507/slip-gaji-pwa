import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Employee } from "../../domain/models/employee.model";

export interface EmployeeDB extends DBSchema {
  employees: {
    key: string;   // id_pegawai
    value: Employee;
    indexes: {
      "by-nip": string;
      "by-tipe": string;
    };
  };
}

const DB_PREFIX = "employee-db";

export async function openEmployeeDB(
  year: number
): Promise<IDBPDatabase<EmployeeDB>> {
  return openDB<EmployeeDB>(`${DB_PREFIX}-${year}`, 1, {
    upgrade(db) {
      const store = db.createObjectStore("employees", {
        keyPath: "id_pegawai",
      });

      store.createIndex("by-nip", "nip", { unique: true });
      store.createIndex("by-tipe", "tipe_pegawai");
    },
  });
}
