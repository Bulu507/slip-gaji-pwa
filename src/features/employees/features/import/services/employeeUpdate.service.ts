import type { Employee } from "@/features/employees/models/employee.model";
import type { ImportedEmployee } from "../models/employee-import.model";
import type { EmployeeDiff } from "../models/employee-diff.model";

export function buildUpdateDiffs(
  existing: Employee[],
  incoming: ImportedEmployee[]
): EmployeeDiff[] {
  const map = new Map(existing.map(e => [e.id, e]));
  const diffs: EmployeeDiff[] = [];

  for (const row of incoming) {
    const old = map.get(row.id);

    if (!old) {
      diffs.push({
        id: row.id,
        status: "NEW",
        incoming: row,
        approved: true,
      });
      continue;
    }

    const changedFields = Object.keys(row)
      .filter(
        k =>
          row[k as keyof Employee] !== old[k as keyof Employee]
      )
      .map(field => ({
        field: field as keyof Employee,
        oldValue: old[field as keyof Employee],
        newValue: row[field as keyof Employee],
      }));

    diffs.push({
      id: row.id,
      status: changedFields.length ? "UPDATED" : "UNCHANGED",
      existing: old,
      incoming: row,
      changedFields,
      approved: changedFields.length === 0,
    });
  }

  return diffs;
}
