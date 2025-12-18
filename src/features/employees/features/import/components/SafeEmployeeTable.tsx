import { Card } from "@/components/ui/card"
import type { EmployeeDiff } from "../models/employee-diff.model"

type Props = {
  data: EmployeeDiff[]
}

export default function SafeEmployeeTable({ data }: Props) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Data Aman</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>NIP</th>
            <th>Nama</th>
            <th>Posisi</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.incoming.name}</td>
              <td>{row.incoming.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
