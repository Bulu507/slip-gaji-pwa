import type { Employee } from "@/features/employees/models/employee.model"
import type { ImportedEmployee } from "../models/employee-import.model"
import type { EmployeeDiff } from "../models/employee-diff.model"


export function generateEmployeeDiff(
  existing: Employee[],
  incoming: ImportedEmployee[]
): {
  safe: EmployeeDiff[]
  conflicts: EmployeeDiff[]
} {
  const existingMap = new Map(existing.map(e => [e.id, e]))
  const safe: EmployeeDiff[] = []
  const conflicts: EmployeeDiff[] = []

  for (const row of incoming) {
    const old = existingMap.get(row.id)

    if (!old) {
      safe.push({ id: row.id, status: "NEW", incoming: row })
      continue
    }

    const changedFields = Object.keys(row).filter(
      k => row[k as keyof Employee] !== old[k as keyof Employee]
    )

    if (changedFields.length === 0) {
      safe.push({
        id: row.id,
        status: "UNCHANGED",
        existing: old,
        incoming: row
      })
    } else {
      conflicts.push({
        id: row.id,
        status: "UPDATED",
        existing: old,
        incoming: row,
        changedFields: changedFields.map(field => ({
          field: field as keyof Employee,
          oldValue: old[field as keyof Employee],
          newValue: row[field as keyof Employee]
        }))
      })
    }
  }

  return { safe, conflicts }
}
