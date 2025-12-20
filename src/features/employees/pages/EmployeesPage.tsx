import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../services/employee-storage.service";
import { useMemo } from "react";

export default function EmployeesPage() {
  const navigate = useNavigate();

  const employees = useMemo(() => {
    return getEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pegawai</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data pegawai sebagai dasar penggajian
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate("/employees/import")}>
          <Upload className="mr-2 h-4 w-4" />
          Import Pegawai
        </Button>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Tipe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.nip}>
                <TableCell>{emp.nip}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.unit}</TableCell>
                <TableCell>{emp.type}</TableCell>
              </TableRow>
            ))}

            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Belum ada data pegawai
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
