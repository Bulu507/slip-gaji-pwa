import type { Employee } from "../models/employee.model"

const STORAGE_KEY = "app.employees"

/**
 * Ambil seluruh data pegawai
 */
export function getEmployees(): Employee[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

/**
 * Ambil 1 pegawai berdasarkan NIP
 */
export function getEmployeeByNip(
  nip: string
): Employee | undefined {
  return getEmployees().find((e) => e.nip === nip)
}

/**
 * Simpan seluruh data pegawai (overwrite)
 */
export function saveEmployees(data: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/**
 * Replace seluruh data pegawai
 */
export function replaceEmployees(data: Employee[]) {
  saveEmployees(data)
}

/**
 * Merge data pegawai (berdasarkan NIP)
 * - existing tetap
 * - incoming overwrite jika NIP sama
 */
export function mergeEmployees(
  existing: Employee[],
  incoming: Employee[]
) {
  const map = new Map<string, Employee>()

  existing.forEach((e) => map.set(e.nip, e))
  incoming.forEach((e) => map.set(e.nip, e))

  saveEmployees(Array.from(map.values()))
}
