import type { Employee } from "../models/employee.model"

const STORAGE_KEY = "app.employees"

export function getEmployees(): Employee[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveEmployees(data: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function replaceEmployees(data: Employee[]) {
  saveEmployees(data)
}

export function mergeEmployees(
  existing: Employee[],
  incoming: Employee[]
) {
  const map = new Map<string, Employee>()
  existing.forEach((e) => map.set(e.employeeId, e))
  incoming.forEach((e) => map.set(e.employeeId, e))

  saveEmployees(Array.from(map.values()))
}
