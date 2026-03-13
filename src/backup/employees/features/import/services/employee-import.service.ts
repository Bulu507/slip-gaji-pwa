import type {
  ImportMode,
  PreviewEmployee,
} from "../models/employee-import.model"
import type { Employee } from "@/features/employees/models/employee.model"

import {
  getEmployees,
  replaceEmployees,
  mergeEmployees,
} from "@/features/employees/services/employee-storage.service"

/**
 * Simpan hasil import pegawai
 * Diasumsikan:
 * - data SUDAH VALID
 * - data SUDAH DI-PREVIEW
 * - user sudah klik "Simpan"
 */
export async function importEmployees(
  preview: PreviewEmployee[],
  mode: ImportMode
): Promise<Employee[]> {
  const mapped = preview.map(mapPreviewToEmployee)

  if (mode === "replace") {
    replaceEmployees(mapped)
    return mapped
  }

  /** mode update */
  const existing = getEmployees()
  mergeEmployees(existing, mapped)

  return getEmployees()
}

/**
 * Mapping Preview → Employee (FINAL)
 */
function mapPreviewToEmployee(p: PreviewEmployee): Employee {
  return {
    nip: p.nip,
    name: p.name,
    grade: p.grade,
    gradeName: p.gradeName,
    jobTitle: p.jobTitle,
    baseSalaryCode: p.baseSalaryCode,
    maritalStatusCode: p.maritalStatusCode,
    position: p.position,
    unit: p.unit,
    employmentType: p.employmentType,
  }
}
