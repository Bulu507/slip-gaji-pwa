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
import { useNavigate } from "react-router-dom"

const dummyEmployees = [
  {
    nip: "198501012010011001",
    name: "Budi Santoso",
    position: "Financial Analyst",
    directorate: "Treasury",
  },
  {
    nip: "199002022015021002",
    name: "Siti Aminah",
    position: "Budget Officer",
    directorate: "Budget",
  },
]

export default function EmployeesPage() {
  const navigate = useNavigate()

  async function handleImport() {
    navigate("/employees/import")
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Button onClick={handleImport}>Import Excel</Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by NIP / Name..."
        className="max-w-sm"
      />

      {/* Table */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIP / NRP</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Directorate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyEmployees.map((emp) => (
              <TableRow key={emp.nip}>
                <TableCell>{emp.nip}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.directorate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
