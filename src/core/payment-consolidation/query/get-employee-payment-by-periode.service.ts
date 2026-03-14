import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { EmployeePayment } from "../models/employee-payment.model";

export async function getEmployeePaymentByPeriode(
  employeeId: string,
  periode: string
): Promise<EmployeePayment | undefined> {

  const db = await getPayrollDB();

  const id = `${employeeId}_${periode}`;

  return db.get("employee_payments", id);

}