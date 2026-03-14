import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { EmployeeIndex } from "../models/employee-index.model";

export async function clearEmployeeIndex(): Promise<void> {
  const db = await getPayrollDB();

  const tx = db.transaction("employee_index", "readwrite");

  await tx.objectStore("employee_index").clear();

  await tx.done;
}

export async function saveEmployeeIndex(
  employees: EmployeeIndex[]
): Promise<void> {

  const db = await getPayrollDB();

  const tx = db.transaction("employee_index", "readwrite");

  const store = tx.objectStore("employee_index");

  for (const employee of employees) {
    await store.put(employee);
  }

  await tx.done;
}