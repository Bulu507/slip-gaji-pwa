import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ImportedEmployee } from "../models/employee-import.model"
import type { EmployeeDiff } from "../models/employee-diff.model"
import type { Employee } from "@/features/employees/models/employee.model"
import { parseEmployeeExcel } from "../services/employeeImport.parser"
import { generateEmployeeDiff } from "../services/employeeDiff.service"
import ImportUploader from "../components/importUploader"
import ImportSummary from "../components/ImportSummary"
import SafeEmployeeTable from "../components/SafeEmployeeTable"
import ConflictEmployeeTable from "../components/ConflictEmployeeTable"
import ImportModeSelector from "../components/importModeSelector"

export default function EmployeesImportPage() {
  /** MODE: replace / update */
  const [importMode, setImportMode] = useState<"REPLACE" | "UPDATE">("UPDATE")

  /** RAW DATA */
  const [importedEmployees, setImportedEmployees] = useState<ImportedEmployee[]>([])

  /** DIFF RESULT */
  const [safeEmployees, setSafeEmployees] = useState<EmployeeDiff[]>([])
  const [conflictEmployees, setConflictEmployees] = useState<EmployeeDiff[]>([])

  /** MOCK DATA EXISTING (sementara) */
  const existingEmployees: Employee[] = [
    {
      id: "123",
      name: "Budi",
      position: "Staff IT"
    }
  ]

  async function handleFileUpload(file: File) {
    const imported = await parseEmployeeExcel(file)
    setImportedEmployees(imported)

    const { safe, conflicts } = generateEmployeeDiff(existingEmployees, imported)
    setSafeEmployees(safe)
    setConflictEmployees(conflicts)
  }

  function handleApproveConflict(id: string, approved: boolean) {
    setConflictEmployees(prev =>
      prev.map(item =>
        item.id === id ? { ...item, approved } : item
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Import Pegawai</h1>
        <p className="text-sm text-muted-foreground">
          Upload data pegawai dari Excel dan review sebelum disimpan
        </p>
      </div>

      {/* MODE */}
      <ImportModeSelector
        value={importMode}
        onChange={setImportMode}
      />

      {/* UPLOADER */}
      <ImportUploader onFileSelected={handleFileUpload} />

      {/* SUMMARY */}
      {importedEmployees.length > 0 && (
        <ImportSummary
          total={importedEmployees.length}
          safe={safeEmployees.length}
          conflict={conflictEmployees.length}
        />
      )}

      {/* SAFE DATA */}
      {safeEmployees.length > 0 && (
        <SafeEmployeeTable data={safeEmployees} />
      )}

      {/* CONFLICT DATA */}
      {conflictEmployees.length > 0 && (
        <ConflictEmployeeTable
          data={conflictEmployees}
          onApprove={handleApproveConflict}
        />
      )}

      {/* ACTION */}
      {(safeEmployees.length > 0 || conflictEmployees.length > 0) && (
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button>Continue</Button>
        </div>
      )}
    </div>
  )
}
