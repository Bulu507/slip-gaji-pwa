import * as XLSX from "xlsx"
import { getEmployeeProfiles } from "@/core/payment-consolidation/query/get-employee-profile.service"

export async function exportEmployeeTemplate(): Promise<void> {

  const employees = await getEmployeeProfiles()

  const rows = employees.map((emp) => ({

    employeeId: emp.employeeId,
    name: emp.name ?? "",
    rank: emp.rank ?? "",

    position: emp.position ?? "",
    unit: emp.unit ?? "",

    nik: emp.nik ?? "",
    npwp: emp.npwp ?? "",

    address: emp.address ?? "",
    notes: emp.notes ?? ""

  }))

  const worksheet = XLSX.utils.json_to_sheet(rows)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "employees")

  XLSX.writeFile(workbook, "employee_template.xlsx")

}