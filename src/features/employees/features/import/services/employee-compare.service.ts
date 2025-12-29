import type { PreviewEmployee } from "../models/import.model"
import type { Employee } from "@/features/employees/models/employee.model"

export function compareEmployees(
  incoming: PreviewEmployee[],
  existing: Employee[]
): PreviewEmployee[] {
  const map = new Map<string, Employee>()
  existing.forEach((e) => map.set(e.nip, e))

  return incoming.map((emp) => {
    const old = map.get(emp.nip)

    if (!old) {
      return { ...emp, action: "new" }
    }

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

    return {
      ...emp,
      action: isChanged ? "update" : "same",
    }
  })
}
