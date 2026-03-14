import { readPayrollTransactions } from "../services/read-payroll-transactions.service";

import { buildEmployeeIndex } from "../services/build-employee-index.service";
import { buildEmployeePayments } from "../services/build-employee-payments.service";

import {
  clearEmployeeIndex,
  saveEmployeeIndex,
} from "../repositories/employee-index.repository";

import {
  clearEmployeePayments,
  saveEmployeePayments,
} from "../repositories/employee-payment.repository";

export async function rebuildConsolidation(): Promise<void> {

  console.log("Starting consolidation rebuild...");

  // 1️⃣ Read transactions
  const payrollTransactions = await readPayrollTransactions();

  const allTransactions = [
    ...payrollTransactions
  ];

  // 2️⃣ Build datasets
  const employeeIndex = buildEmployeeIndex(allTransactions);

  const employeePayments = buildEmployeePayments(allTransactions);

  // 3️⃣ Clear old datasets
  await clearEmployeeIndex();
  await clearEmployeePayments();

  // 4️⃣ Save new datasets
  await saveEmployeeIndex(employeeIndex);
  await saveEmployeePayments(employeePayments);

  console.log("Consolidation rebuild completed");

}