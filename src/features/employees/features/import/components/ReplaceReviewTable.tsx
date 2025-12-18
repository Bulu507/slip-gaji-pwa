import type { EmployeeDiff } from "../models/employee-diff.model";

export function ReplaceReviewTable({ rows }: { rows: EmployeeDiff[] }) {
  return (
    <div className="border rounded-lg overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.incoming.id}</td>
              <td>{r.incoming.name}</td>
              <td>{r.incoming.position}</td>
              <td>{r.incoming.typeUser}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
