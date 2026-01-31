import type {
  PreviewEmployee,
  ImportAction,
} from "../models/employee-import.model"
import type { Employee } from "@/features/employees/models/employee.model"

/**
 * Bandingkan data pegawai hasil import dengan data existing
 * Menentukan action: new | update | same
 */
export function compareEmployees(
  incoming: PreviewEmployee[],
  existing: Employee[]
): PreviewEmployee[] {
  const existingMap = new Map<string, Employee>()
  existing.forEach((e) => existingMap.set(e.nip, e))

  return incoming.map((emp) => {
    const old = existingMap.get(emp.nip)

    let action: ImportAction = "new"

    if (old) {
      const isChanged =
        old.name !== emp.name ||
        old.grade !== emp.grade ||
        old.gradeName !== emp.gradeName ||
        old.jobTitle !== emp.jobTitle ||
        old.baseSalaryCode !== emp.baseSalaryCode ||
        old.maritalStatusCode !== emp.maritalStatusCode ||
        old.position !== emp.position ||
        old.unit !== emp.unit ||
        old.employmentType !== emp.employmentType

      action = isChanged ? "update" : "same"
    }

    return {
      ...emp,
      action,
    }
  })
}
