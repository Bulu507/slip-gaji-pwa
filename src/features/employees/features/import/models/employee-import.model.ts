import type { Employee } from "@/features/employees/models/employee.model";

export interface ImportedEmployee extends Employee {
  rowNumber: number
}
