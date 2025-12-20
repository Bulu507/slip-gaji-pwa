import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Breadcrumb } from "@/components/ui/breadcrumb"

import type { PreviewEmployee } from "../models/import.model"
import type { Employee } from "@/features/employees/models/employee.model"

import ImportSummaryBox from "../components/ImportSummaryBox"

import { importEmployeeFromExcel } from "../services/employee-import.service"
import {
  getEmployees,
  mergeEmployees,
  replaceEmployees,
} from "@/features/employees/services/employee-storage.service"

type ImportMode = "replace" | "update"

export default function EmployeeImportPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [mode, setMode] = useState<ImportMode | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [previewData, setPreviewData] = useState<PreviewEmployee[]>([])
  const [duplicatedNips, setDuplicatedNips] = useState<string[]>([])

  const hasPreview = previewData.length > 0
  const isUpdateMode = mode === "update"

  async function handleFileUpload(file: File) {
    if (!mode) return

    setLoading(true)
    setError(null)
    setDuplicatedNips([])
    setPreviewData([])

    const existingEmployees = getEmployees()

    const result = await importEmployeeFromExcel(
      file,
      mode,
      existingEmployees
    )

    setLoading(false)

    if (result.error) {
      if (result.error.type === "DUPLICATE_NIP") {
        setError("Import gagal. Ditemukan NIP ganda.")
        setDuplicatedNips(result.error.duplicatedNips)
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      return
    }

    setPreviewData(result.data ?? [])

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleCommit() {
    if (!mode || previewData.length === 0) return

    const employeesToSave: Employee[] = previewData
      .filter((p) => mode === "replace" || p.action !== "same")
      .map((p) => ({
        nip: p.nip,
        name: p.name,
        unit: p.unit,
        position: p.position,
        type: p.type,
      }))

    if (mode === "replace") {
      replaceEmployees(employeesToSave)
    } else {
      const existing = getEmployees()
      mergeEmployees(existing, employeesToSave)
    }

    navigate("/employees", { replace: true })
  }

  function resetImportState() {
    setMode(null)
    setPreviewData([])
    setError(null)
    setDuplicatedNips([])
    setLoading(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Breadcrumb
            items={[
              { label: "Pegawai", to: "/employees" },
              { label: "Import Pegawai" },
            ]}
          />
          <h1 className="text-2xl font-semibold">Import Pegawai</h1>
          <p className="text-sm text-muted-foreground">
            Seluruh perubahan data pegawai hanya melalui import Excel
          </p>
        </div>

        <Button variant="destructive" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <p className="font-medium text-destructive">{error}</p>
          {duplicatedNips.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {duplicatedNips.map((nip) => (
                <li key={nip}>{nip}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* MODE & UPLOAD */}
      {!hasPreview && (
        <>
          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium">Mode Import</label>
            <Select onValueChange={(v: ImportMode) => setMode(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih mode import" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="replace">
                  Ganti seluruh data pegawai
                </SelectItem>
                <SelectItem value="update">
                  Update / tambah data pegawai
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium">File Excel</label>
            <Button
              variant="outline"
              className="w-full"
              disabled={!mode || loading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Memproses..." : "Pilih File"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
          </div>
        </>
      )}

      {/* PREVIEW */}
      {hasPreview && (
        <>
          {/* SUMMARY */}
          {isUpdateMode && <ImportSummaryBox data={previewData} />}

          {/* ACTION */}
          <div className="rounded-md border bg-card p-4 text-sm flex justify-between">
            <p className="text-muted-foreground">
              Total data: {previewData.length}
            </p>

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetImportState}>
                Batalkan
              </Button>
              <Button onClick={handleCommit}>Simpan Data</Button>
            </div>
          </div>

          {/* TABLE */}
          <div className="rounded-md border overflow-hidden text-sm bg-background">
            <table className="w-full">
              <thead>
                <tr>
                  {isUpdateMode && (
                    <th className="px-3 py-2 text-left">Status</th>
                  )}
                  <th className="px-3 py-2 text-left">NIP</th>
                  <th className="px-3 py-2 text-left">Nama</th>
                  <th className="px-3 py-2 text-left">Unit</th>
                  <th className="px-3 py-2 text-left">Jabatan</th>
                  <th className="px-3 py-2 text-left">Tipe</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((emp) => (
                  <tr key={emp.nip} className="border-t">
                    {isUpdateMode && (
                      <td className="px-3 py-2">
                        {emp.action === "new" && (
                          <span className="text-green-600 font-medium">
                            BARU
                          </span>
                        )}
                        {emp.action === "update" && (
                          <span className="text-orange-600 font-medium">
                            UPDATE
                          </span>
                        )}
                        {emp.action === "same" && (
                          <span className="text-muted-foreground">
                            TIDAK BERUBAH
                          </span>
                        )}
                      </td>
                    )}
                    <td className="px-3 py-2">{emp.nip}</td>
                    <td className="px-3 py-2">{emp.name}</td>
                    <td className="px-3 py-2">{emp.unit}</td>
                    <td className="px-3 py-2">{emp.position}</td>
                    <td className="px-3 py-2">{emp.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
