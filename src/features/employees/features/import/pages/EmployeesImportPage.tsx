import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { ImportHeader } from "../components/ImportHeader";
import { ReplaceReviewTable } from "../components/ReplaceReviewTable";
import { UpdateReviewTable } from "../components/UpdateReviewTable";
import { ImportActions } from "../components/ImportActions";

import { parseEmployeeExcel } from "../services/employeeImport.parser";
import { buildUpdateDiffs } from "../services/employeeUpdate.service";

import type { ImportMode } from "../types/import-mode.type";
import type { EmployeeDiff } from "../models/employee-diff.model";
import { buildReplacePreview } from "../services/employeReplace.service";
import { ImportUploader } from "../components/importUploader";
import { ImportHeader } from "../components/ImportHeader";

export default function EmployeesImportPage({
  mode,
}: {
  mode: ImportMode;
}) {
  const navigate = useNavigate();

  const [step, setStep] = useState<"UPLOAD" | "REVIEW">("UPLOAD");
  const [rows, setRows] = useState<EmployeeDiff[]>([]);

  async function handleUpload(file: File) {
    const imported = await parseEmployeeExcel(file);

    const preview =
      mode === "REPLACE"
        ? buildReplacePreview(imported)
        : buildUpdateDiffs([], imported);

    console.log('===== SHOW DATA', preview);
    
    setRows(preview);
    setStep("REVIEW");
  }

  function handleCancel() {
    // ⬅️ kembali ke kondisi awal
    setRows([]);
    setStep("UPLOAD");
  }

  function handleToggle(id: string) {    
    setRows(r =>
      r.map(row =>
        row.id === id ? { ...row, approved: !row.approved } : row
      )
    );
  }

  function handleSave() {
    // TODO: simpan rows.filter(r => r.approved)
    navigate("/employees");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <ImportHeader />

      {/* Content */}
      {step === "UPLOAD" && (
        <ImportUploader onFileSelected={handleUpload} />
      )}

      {step === "REVIEW" && (
        <>
          {mode === "REPLACE" ? (
            <ReplaceReviewTable rows={rows} />
          ) : (
            <UpdateReviewTable rows={rows} onToggle={handleToggle} />
          )}

          <ImportActions
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
}
