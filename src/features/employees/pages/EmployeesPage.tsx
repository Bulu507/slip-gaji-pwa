import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Employee } from "../models/employee.model"
import { getEmployees } from "../services/employee-storage.service"

export default function EmployeesPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")

  /** Ambil data pegawai */
  const employees: Employee[] = useMemo(() => {
    return getEmployees()
  }, [])

  /** Filter (NIP / Nama) */
  const filteredEmployees = useMemo(() => {
    if (!keyword) return employees

    const q = keyword.toLowerCase()

    return employees.filter(
      (e) =>
        e.nip.toLowerCase().includes(q) ||
        e.name.toLowerCase().includes(q)
    )
  }, [employees, keyword])

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pegawai</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data pegawai sebagai dasar penggajian
          </p>
        </div>

        <Button onClick={() => navigate("/employees/import")}>
          <Upload className="mr-2 h-4 w-4" />
          Import Pegawai
        </Button>
      </div>

      {/* FILTER */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Cari NIP atau Nama Pegawai"
          className="max-w-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Golongan</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-6"
                >
                  Belum ada data pegawai
                </TableCell>
              </TableRow>
            )}

            {filteredEmployees.map((emp) => (
              <TableRow
                key={emp.nip}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/employees/${emp.nip}`)}
              >
                <TableCell>{emp.nip}</TableCell>
                <TableCell className="font-medium">
                  {emp.name}
                </TableCell>
                <TableCell>{emp.grade}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.unit}</TableCell>
                <TableCell>{emp.employmentType}</TableCell>
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate(`/employees/${emp.nip}`)
                    }
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
