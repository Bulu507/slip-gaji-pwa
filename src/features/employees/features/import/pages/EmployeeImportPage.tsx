import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, ArrowLeft } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import type { Employee } from "@/features/employees/models/employee.model"
import { importEmployeeFromExcel } from "../services/employee-import.service"

type ImportMode = "replace" | "update"

export default function EmployeeImportPage() {
  const [mode, setMode] = useState<ImportMode | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<Employee[]>([])
  const [duplicatedNips, setDuplicatedNips] = useState<string[]>([])

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // mock: nanti ganti dari API / store
  const existingEmployees: Employee[] = []

  async function handleFileUpload(file: File) {
    if (!mode) return

    setLoading(true)
    setError(null)
    setDuplicatedNips([])
    setPreviewData([])

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

      // 🔑 PENTING: reset input agar file yg sama bisa dipilih ulang
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      return
    }

    setPreviewData(result.data || [])

    // optional: reset input setelah sukses load
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleCancel() {
    setPreviewData([])
    setError(null)
    setDuplicatedNips([])
    setMode(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const hasPreview = previewData.length > 0

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
          <div>
            <h1 className="text-2xl font-semibold">Import Pegawai</h1>
            <p className="text-sm text-muted-foreground">
              Seluruh perubahan data pegawai hanya melalui import Excel
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {/* ERROR DUPLIKASI */}
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

      {/* MODE & UPLOAD (HANYA SAAT BELUM LOAD DATA) */}
      {!hasPreview && (
        <>
          {/* MODE */}
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

            {mode === "replace" && (
              <p className="text-xs text-destructive">
                ⚠ Semua data pegawai lama akan dihapus
              </p>
            )}
            {mode === "update" && (
              <p className="text-xs text-muted-foreground">
                Update berdasarkan NIP, data baru akan ditambahkan
              </p>
            )}
          </div>

          {/* UPLOAD */}
          <div className="space-y-2 max-w-md">
            <label className="text-sm font-medium">File Excel</label>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                disabled={!mode || loading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {loading ? "Memproses..." : "Pilih File"}
              </Button>

              <span className="text-sm text-muted-foreground">
                .xlsx
              </span>
            </div>

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

      {/* PREVIEW SUMMARY */}
      {hasPreview && (
        <div className="rounded-md border bg-card p-4 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ringkasan Import</p>
              <p className="text-muted-foreground">
                Total data: {previewData.length}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Batalkan
              </Button>
              <Button>Simpan Data</Button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW TABLE (contoh sederhana) */}
      {hasPreview && (
        <div className="border rounded-md overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
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
      )}
    </div>
  )
}
