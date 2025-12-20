import type { ExcelEmployeeRow, PreviewEmployee } from "../models/import.model"
import type { Employee } from "@/features/employees/models/employee.model"

export function compareEmployees(
  excelRows: ExcelEmployeeRow[],
  existingEmployees: Employee[]
): PreviewEmployee[] {
  const map = new Map<string, Employee>()
  existingEmployees.forEach((e) => map.set(e.nip, e))

  return excelRows.map((row) => {
    const existing = map.get(row.nip)

    if (!existing) {
      return { ...row, action: "new" }
    }

    const isChanged =
      existing.name !== row.name ||
      existing.position !== row.position ||
      existing.unit !== row.unit ||
      existing.type !== row.type

    return {
      ...row,
      action: isChanged ? "update" : "same",
    }
  })
}
