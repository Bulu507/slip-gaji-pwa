import type { ImportedEmployee } from "../models/employee-import.model";
import type { EmployeeDiff } from "../models/employee-diff.model";

export function buildReplacePreview(
  incoming: ImportedEmployee[]
): EmployeeDiff[] {
  return incoming.map(row => ({
    id: row.id,
    status: "NEW",
    incoming: row,
    approved: true,
  }));
}
