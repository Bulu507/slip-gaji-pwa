import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { PreviewEmployee } from "../models/employee-import.model";
import type { Employee } from "@/features/employees/models/employee.model";
import type { EmployeeImportErrorRow } from "../models/employee-import-error.model";

import ImportSummaryBox from "../components/ImportSummaryBox";
import ImportPreviewTable from "../components/ImportPreviewTable";
import { EmployeeImportErrorModal } from "../components/EmployeeImportErrorModal";

import {
  getEmployees,
  mergeEmployees,
  replaceEmployees,
} from "@/features/employees/services/employee-storage.service";
import { previewEmployeeImport } from "../services/employee-import-preview.service";

type ImportMode = "replace" | "update";
type Step = "form" | "preview";

export default function EmployeeImportPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // STATE
  // =========================
  const [step, setStep] = useState<Step>("form");
  const [mode, setMode] = useState<ImportMode>("replace");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewEmployee[]>([]);

  const [errorRows, setErrorRows] = useState<EmployeeImportErrorRow[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isReady = !!file && !!mode;
  const isUpdateMode = mode === "update";

  // =========================
  // PREVIEW
  // =========================
  const handlePreview = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const existingEmployees = getEmployees();
      const result = await previewEmployeeImport(file, mode, existingEmployees);

      if (result.error) {
        if (result.error.type === "DUPLICATE_NIP") {
          setErrorRows(
            result.error.duplicatedNips.map((nip, i) => ({
              rowIndex: i + 1,
              nip,
              name: "",
              reason: "NIP duplikat di dalam file Excel",
            }))
          );
          setShowErrorModal(true);
        }
        return;
      }

      setPreviewData(result.data);
      setStep("preview");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = () => {
    const employeesToSave: Employee[] = previewData
      .filter((p) => mode === "replace" || p.action !== "same")
      .map((p) => ({
        nip: p.nip,
        name: p.name,
        grade: p.grade,
        gradeName: p.gradeName,
        jobTitle: p.jobTitle,
        baseSalaryCode: p.baseSalaryCode,
        maritalStatusCode: p.maritalStatusCode,
        position: p.position,
        unit: p.unit,
        employmentType: p.employmentType,
      }));

    if (mode === "replace") {
      replaceEmployees(employeesToSave);
    } else {
      mergeEmployees(getEmployees(), employeesToSave);
    }

    navigate("/employees", { replace: true });
  };

  // =========================
  // CANCEL
  // =========================
  const handleCancel = () => {
    setStep("form");
    setPreviewData([]);
    setError(null);
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================
  // RENDER
  // =========================
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

      {/* FORM */}
      {step === "form" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mode Import</label>
            <div>
              <Select
                value={mode}
                onValueChange={(v) => setMode(v as ImportMode)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="replace">Ganti seluruh data</SelectItem>
                  <SelectItem value="update">Update / tambah data</SelectItem>
                </SelectContent>
              </Select>
              {mode === "replace" && (
                <label className="text-sm text-destructive">
                  * Pilihan ini akan menghapus dan mengganti seluruh data pegawai
                </label>
              )}
              {mode === "update" && (
                <label className="text-sm text-destructive">
                  * Pilihan ini hanya akan mengupdate / menambah data pegawai
                </label>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            disabled={!mode}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {file ? file.name : "Pilih File Excel"}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end">
            <Button disabled={!isReady || loading} onClick={handlePreview}>
              Cek & Preview
            </Button>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {step === "preview" && (
        <div className="space-y-4">
          {isUpdateMode && <ImportSummaryBox data={previewData} />}

          <ImportPreviewTable data={previewData} showAction={isUpdateMode} />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Batalkan
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      <EmployeeImportErrorModal
        open={showErrorModal}
        errors={errorRows}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
