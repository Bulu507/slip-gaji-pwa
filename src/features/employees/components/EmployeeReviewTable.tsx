import type { Employee } from "../models/employee.model"

type Props = { employees: Employee[] }

export function EmployeeReviewTable({ employees }: Props) {
  return (
    <div className="border rounded-md overflow-auto max-h-[600px]">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">NIP</th>
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Grade</th>
            <th className="p-2">Direktorat</th>
            <th className="p-2">Tipe ASN</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="p-2">{emp.id}</td>
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.position}</td>
              <td className="p-2">{emp.grade}</td>
              <td className="p-2">{emp.directorate}</td>
              <td className="p-2">{emp.asnType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
