import type { Employee } from "../models/employee.model";

const STORAGE_KEY = "app.employees";

export type EmployeeMap = Record<string, Employee>;

/**
 * Ambil seluruh data pegawai
 */
export function getEmployees(): Employee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Simpan seluruh data pegawai (overwrite)
 */
export function saveEmployees(data: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Hapus seluruh data pegawai
 */
export function clearEmployees() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Replace mode:
 * Semua data lama dihapus, diganti data baru
 */
export function replaceEmployees(newData: Employee[]) {
  saveEmployees(newData);
}

/**
 * Update mode:
 * - Update jika NIP ada
 * - Tambah jika NIP belum ada
 */
export function mergeEmployees(
  existing: Employee[],
  incoming: Employee[]
): Employee[] {
  const map: EmployeeMap = {};

  for (const emp of existing) {
    map[emp.nip] = emp;
  }

  for (const emp of incoming) {
    map[emp.nip] = emp;
  }

  const merged = Object.values(map);
  saveEmployees(merged);

  return merged;
}
