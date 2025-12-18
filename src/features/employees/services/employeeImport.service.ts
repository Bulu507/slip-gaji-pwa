import * as XLSX from "xlsx"
import type { Employee } from "../models/employee.model"
import { mapExcelRowToEmployee, type EmployeeExcelRow } from "../utils/employeeExel.mapper"

export async function importEmployeesFromExcel(file: File): Promise<Employee[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  // hasil parsing typed sebagai EmployeeExcelRow[]
  const rows = XLSX.utils.sheet_to_json<EmployeeExcelRow>(sheet)

  const employees = rows
    .map(mapExcelRowToEmployee)
    .filter(emp => emp.id) // hanya yang punya ID

  return employees
}
