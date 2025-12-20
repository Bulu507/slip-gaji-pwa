import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Upload } from "lucide-react"
import { useNavigate } from "react-router-dom"

const dummyEmployees = [
  {
    nip: "198501012010011001",
    name: "Budi Santoso",
    position: "Staff IT",
    unit: "Teknologi Informasi",
    status: "Aktif",
  },
]

export default function EmployeeListPage() {
  const navigate = useNavigate()

  async function handleImport() {
    navigate("/employees/import")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pegawai</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data pegawai sebagai dasar penggajian
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" /> Import Pegawai
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Cari NIP atau Nama Pegawai"
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyEmployees.map((emp) => (
              <TableRow key={emp.nip}>
                <TableCell>{emp.nip}</TableCell>
                <TableCell className="font-medium">
                  {emp.name}
                </TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.unit}</TableCell>
                <TableCell>{emp.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="link" size="sm">Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
