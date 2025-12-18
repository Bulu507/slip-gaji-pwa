import type { Employee } from "@/features/employees/models/employee.model"
import type { ImportedEmployee } from "./employee-import.model"

export type DiffStatus =
  | "NEW"
  | "UNCHANGED"
  | "UPDATED"
  | "CONFLICT"

export interface EmployeeDiff {
  id: string
  status: DiffStatus

  existing?: Employee
  incoming: ImportedEmployee

  changedFields?: Array<{
    field: keyof Employee
    oldValue: unknown
    newValue: unknown
  }>

  approved?: boolean
}
