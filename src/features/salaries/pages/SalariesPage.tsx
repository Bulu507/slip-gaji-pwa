import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table"
import type { SalaryPeriod } from "../models/salary-period.model"

const mockPeriods: SalaryPeriod[] = [
  {
    id: "2025-12",
    bulan: 12,
    tahun: 2025,
    totalPegawai: 3,
    totalGajiBersih: 12642600,
    createdAt: new Date().toISOString(),
  },
]

export default function SalariesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Gaji</h1>
        <Button>Import Gaji</Button>
      </div>

      <Card>
        <Table>
          <thead>
            <TableRow>
              <TableHead>Bulan</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Jumlah Pegawai</TableHead>
              <TableHead>Total Gaji Bersih</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </thead>
          <tbody>
            {mockPeriods.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.bulan}</TableCell>
                <TableCell>{p.tahun}</TableCell>
                <TableCell>{p.totalPegawai}</TableCell>
                <TableCell>
                  Rp {p.totalGajiBersih.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}
