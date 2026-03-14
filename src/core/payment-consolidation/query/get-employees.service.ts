import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { EmployeeIndex } from "../models/employee-index.model";

export async function getEmployees(): Promise<EmployeeIndex[]> {

  const db = await getPayrollDB();

  return db.getAll("employee_index");

}