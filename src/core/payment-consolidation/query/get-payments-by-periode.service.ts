import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { EmployeePayment } from "../models/employee-payment.model";

export async function getPaymentsByPeriode(
  periode: string
): Promise<EmployeePayment[]> {

  const db = await getPayrollDB();

  const index = db.transaction("employee_payments")
    .store
    .index("by_periode");

  return index.getAll(periode);

}