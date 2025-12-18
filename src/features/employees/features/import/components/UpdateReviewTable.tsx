import { Button } from "@/components/ui/button";
import type { EmployeeDiff } from "../models/employee-diff.model";

export function UpdateReviewTable({
  rows,
  onToggle,
}: {
  rows: EmployeeDiff[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {rows.map(row => (
        <div
          key={row.id}
          className={`border rounded p-4 ${
            row.status === "UPDATED" ? "border-yellow-500" : ""
          }`}
        >
          <div className="flex justify-between">
            <div>
              <strong>{row.incoming.name}</strong> ({row.id})
            </div>
            {row.status === "UPDATED" && (
              <Button
                size="sm"
                variant={row.approved ? "secondary" : "destructive"}
                onClick={() => onToggle(row.id)}
              >
                {row.approved ? "Approved" : "Rejected"}
              </Button>
            )}
          </div>

          {row.changedFields?.map(f => (
            <div key={String(f.field)} className="text-sm">
              {f.field}: {String(f.oldValue)} →{" "}
              <strong>{String(f.newValue)}</strong>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
