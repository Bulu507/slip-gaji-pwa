import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { EmployeePayment } from "../models/employee-payment.model";

export async function clearEmployeePayments(): Promise<void> {

  const db = await getPayrollDB();

  const tx = db.transaction("employee_payments", "readwrite");

  await tx.objectStore("employee_payments").clear();

  await tx.done;
}

export async function saveEmployeePayments(
  payments: EmployeePayment[]
): Promise<void> {

  const db = await getPayrollDB();

  const tx = db.transaction("employee_payments", "readwrite");

  const store = tx.objectStore("employee_payments");

  for (const payment of payments) {
    await store.put(payment);
  }

  await tx.done;
}