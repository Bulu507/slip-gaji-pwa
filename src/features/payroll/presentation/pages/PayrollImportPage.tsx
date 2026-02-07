import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import type { PayrollImportResult } from "../../application/import/payroll-import.types";
import {
  PayrollImportForm,
  type PayrollImportFormInput,
} from "../components/PayrollImportForm";
import { PayrollImportPreviewDialog } from "../components/PayrollImportPreviewDialog";
import { usePayrollImport } from "../hooks/usePayrollImport";
import { Button } from "@/components/ui/button";

export function PayrollImportPage() {
  const navigate = useNavigate();
  const { preview, importPayroll, loading, error } = usePayrollImport();

  const [formInput, setFormInput] =
    useState<PayrollImportFormInput | null>(null);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // ================================
  // STEP 1: SUBMIT → PREVIEW
  // ================================
  async function handleSubmit(
    input: PayrollImportFormInput,
  ): Promise<PayrollImportResult> {
    setFormInput(input);

    const result = await preview(input);
    setPreviewData(result);
    setPreviewOpen(true);

    // ⛔️ JANGAN IMPORT DI SINI
    return {
      batchId: "",
      jumlahTransaksi: 0,
      totalNetto: 0,
    };
  }

  // ================================
  // STEP 2: CONFIRM → IMPORT
  // ================================
  async function handleConfirmImport() {
    if (!formInput) return;

    setPreviewOpen(false);

    const result = await importPayroll(formInput);

    toast.success("Data gaji berhasil disimpan");

    navigate(`/payroll/batch/${result.batchId}`);
  }

  return (
    <div className="space-y-6 w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate("/payroll")}>
          ← Kembali
        </Button>
      </div>

      <h1 className="text-xl font-semibold">
        Import Gaji
      </h1>

      {/* Form */}
      <div className="w-full">
        <PayrollImportForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>

      {/* Preview Dialog */}
      {previewData && (
        <PayrollImportPreviewDialog
          open={previewOpen}
          data={previewData}
          onCancel={() => setPreviewOpen(false)}
          onConfirm={handleConfirmImport}
        />
      )}
    </div>
  );
}
