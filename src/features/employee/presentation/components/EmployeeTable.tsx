import { useNavigate } from "react-router-dom"
import type { EmployeeProfile } from "@/core/payment-consolidation/models/employee-profile.model"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { displayValue } from "@/lib/utils"

interface Props {
  employees: EmployeeProfile[]
  loading: boolean
}

export function EmployeeTable({ employees, loading }: Props) {

  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
  }

  if (employees.length === 0) {
    return (
      <Card className="p-10 text-center">
        <div className="space-y-2">

          <div className="text-lg font-semibold">
            Tidak ada data pegawai
          </div>

          <div className="text-sm text-muted-foreground">
            Data pegawai akan muncul setelah
            data payroll atau pembayaran lainnya diimport.
          </div>

        </div>
      </Card>
    )
  }

  return (
    <div className="rounded-lg border bg-white overflow-hidden">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="w-[220px]">NIP</TableHead>

            <TableHead>Nama</TableHead>

            <TableHead className="w-[120px] text-center">
              Pangkat
            </TableHead>

            <TableHead className="w-[140px] text-center">
              Posisi
            </TableHead>

            <TableHead className="w-[200px]">
              Unit
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {employees.map((emp) => (

            <TableRow
              key={emp.employeeId}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/employees/${emp.employeeId}`)}
            >

              <TableCell className="font-mono">
                {displayValue(emp.employeeId)}
              </TableCell>

              <TableCell>
                {displayValue(emp.name)}
              </TableCell>

              <TableCell className="text-center">
                {displayValue(emp.rank)}
              </TableCell>

              <TableCell className="text-center">
                {displayValue(emp.position)}
              </TableCell>

              <TableCell>
                {displayValue(emp.unit)}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  )

}