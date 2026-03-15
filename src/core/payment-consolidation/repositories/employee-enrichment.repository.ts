import { getPayrollDB } from "@/features/payroll/data/db/payroll-db";
import type { EmployeeEnrichment } from "../models/employee-enrichment.model";

export async function getEmployeeEnrichment(
  employeeId: string
): Promise<EmployeeEnrichment | undefined> {

  const db = await getPayrollDB();

  return db.get("employee_enrichment", employeeId);

}

export async function getAllEmployeeEnrichment(): Promise<EmployeeEnrichment[]> {

  const db = await getPayrollDB();

  return db.getAll("employee_enrichment");

}

export async function saveEmployeeEnrichment(
  enrichment: EmployeeEnrichment
): Promise<void> {

  const db = await getPayrollDB();

  const tx = db.transaction("employee_enrichment", "readwrite");

  await tx.store.put(enrichment);

  await tx.done;

}

export async function saveManyEmployeeEnrichment(
  records: EmployeeEnrichment[]
): Promise<void> {

  const db = await getPayrollDB();

  const tx = db.transaction("employee_enrichment", "readwrite");

  const store = tx.store;

  for (const record of records) {
    await store.put(record);
  }

  await tx.done;

}