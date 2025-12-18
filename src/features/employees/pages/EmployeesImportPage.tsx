import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmployeeReviewTable } from "../components/EmployeeReviewTable"
import type { Employee } from "../models/employee.model"
import { importEmployeesFromExcel } from "../services/employeeImport.service"
import { Breadcrumb } from "@/components/ui/breadcrumb"

const breadcrumbItems = [
    { label: "Employees", to: "/employees" },
    { label: "Import" },
  ]

export default function EmployeeImportPage() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [fileName, setFileName] = useState<string | null>(null)

  function handleBack() {
    navigate("/employees") // kembali ke halaman pegawai
  }

  async function handleUpload(file: File) {
    const data = await importEmployeesFromExcel(file)
    setEmployees(data)
    setFileName(file.name)
  }

  function handleConfirmImport() {
    // TODO: simpan ke IndexedDB / localStorage
    console.log("Imported", employees.length, "employees")
    alert(`${employees.length} employees imported successfully!`)
    setEmployees([])
    setFileName(null)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbItems} />

        <Button variant="destructive" size="sm" onClick={handleBack}>
          ✕ Close
        </Button>
      </div>

      <h1 className="text-2xl font-bold">Import Employee Data</h1>

      {/* Upload File */}
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".xlsx,.xls"
          hidden
          id="upload-excel"
          onChange={e => {
            if (e.target.files?.[0]) handleUpload(e.target.files[0])
          }}
        />
        <Button asChild>
          <label htmlFor="upload-excel">Upload Excel</label>
        </Button>
        {fileName && <span className="text-muted-foreground">{fileName}</span>}
      </div>

      {/* Preview Table */}
      {employees.length > 0 && (
        <>
          <EmployeeReviewTable employees={employees} />
          <div className="flex justify-end">
            <Button onClick={handleConfirmImport}>Confirm Import</Button>
          </div>
        </>
      )}
    </div>
  )
}
