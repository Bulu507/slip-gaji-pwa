/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

import type { SalaryImportMode } from "../models/salary-import.model";
import type { SalaryImportPreviewRow } from "../models/salary-import-preview.model";
import type { SalaryImportErrorRow } from "../models/salary-import-error.model";

import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";
import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";

import { parseSalaryExcel } from "../services/salary-excel-parser.service";
import { validateSalaryPreview } from "../services/salary-preview-validation.service";
import { compareSalaryPreview } from "../services/salary-compare.service";
import { importSalary } from "../services/salary-import.service";

import { SalaryImportPreviewTable } from "../components/SalaryImportPreviewTable";
import { SalaryImportHeader } from "../components/SalaryImportHeader";
import { SalaryImportErrorModal } from "../components/SalaryImportErrorModal";

type Step = "form" | "preview";

export default function SalaryImportPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // STATE
  // =========================
  const [step, setStep] = useState<Step>("form");
  const [file, setFile] = useState<File | null>(null);

  const [bulan, setBulan] = useState<number | "">("");
  const [tahun, setTahun] = useState<number | "">("");
  const [mode, setMode] = useState<SalaryImportMode>("replace");

  const [previewRows, setPreviewRows] = useState<SalaryImportPreviewRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // VALIDATION ERROR
  const [validationErrors, setValidationErrors] = useState<
    SalaryImportErrorRow[]
  >([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // =========================
  // DERIVED STATE
  // =========================
  const isPeriodReady = bulan !== "" && tahun !== "";
  const isReady = isPeriodReady && !!file;

  // =========================
  // HANDLER: PREVIEW
  // =========================
  const handlePreview = async () => {
    if (!file || bulan === "" || tahun === "") return;

    try {
      setLoading(true);
      setError(null);

      const rows = await parseSalaryExcel(file);

      const validation = validateSalaryPreview(rows, {
        bulan: bulan as number,
        tahun: tahun as number,
      });

      // ❌ VALIDATION ERROR → MODAL
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setShowErrorModal(true);
        return;
      }

      // ✅ COMPARE STATUS
      const preview = compareSalaryPreview(rows, {
        bulan: bulan as number,
        tahun: tahun as number,
      });

      setPreviewRows(preview);
      setStep("preview");
    } catch (err) {
      resetFileInput();
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLER: SAVE
  // =========================
  const handleSave = () => {
    importSalary(
      { bulan: bulan as number, tahun: tahun as number, mode },
      previewRows.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ action, ...row }) => row
      )
    );

    toast.success("Data gaji berhasil disimpan");
    navigate("/salary");
  };

  // =========================
  // HANDLER: CANCEL
  // =========================
  const handleCancel = () => {
    setStep("form");
    setPreviewRows([]);
    resetFileInput();
    setError(null);
  };

  // =========================
  // HANDLER: RESET FILE
  // =========================
  const resetFileInput = () => {
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
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Breadcrumb
            items={[{ label: "Gaji", to: "/salary" }, { label: "Import Gaji" }]}
          />
          <h1 className="text-2xl font-semibold">Import Gaji</h1>
          <p className="text-sm text-muted-foreground">
            Seluruh perubahan data gaji hanya melalui import Excel
          </p>
        </div>

        <Button variant="destructive" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {/* ================= FORM ================= */}
      {step === "form" && (
        <div className="space-y-6">
          {/* PERIODE */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={bulan !== "" ? String(bulan) : ""}
              onValueChange={(v) => setBulan(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih bulan" />
              </SelectTrigger>
              <SelectContent>
                {MONTH_OPTIONS.map((m) => (
                  <SelectItem key={m.value} value={String(m.value)}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={tahun !== "" ? String(tahun) : ""}
              onValueChange={(v) => setTahun(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tahun" />
              </SelectTrigger>
              <SelectContent>
                {YEAR_OPTIONS.map((y) => (
                  <SelectItem key={y.value} value={String(y.value)}>
                    {y.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* MODE */}
          <Select
            value={mode}
            onValueChange={(v) => setMode(v as SalaryImportMode)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="replace">Ganti seluruh data</SelectItem>
              <SelectItem value="update">Update / tambah per NIP</SelectItem>
            </SelectContent>
          </Select>

          {/* FILE */}
          <Button
            variant="outline"
            disabled={!isPeriodReady}
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

      {/* ================= PREVIEW ================= */}
      {step === "preview" && (
        <div className="space-y-4">
          <SalaryImportHeader data={previewRows} mode={mode} />
          <SalaryImportPreviewTable rows={previewRows} mode={mode} />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Batalkan
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      )}

      {/* ================= ERROR MODAL ================= */}
      <SalaryImportErrorModal
        open={showErrorModal}
        errors={validationErrors}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
