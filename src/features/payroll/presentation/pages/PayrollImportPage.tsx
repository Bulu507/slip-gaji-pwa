import type { PayrollImportResult } from "../../application/import/payroll-import.types";
import {
  PayrollImportForm,
  type PayrollImportFormInput,
} from "../components/PayrollImportForm";
import { usePayrollImport } from "../hooks/usePayrollImport";

export function PayrollImportPage() {
  const { importPayroll, loading, error } = usePayrollImport();

  async function handleSubmit(
    input: PayrollImportFormInput,
  ): Promise<PayrollImportResult> {
    const result = await importPayroll(input);

    // nanti:
    // navigate(`/payroll/batch/${result.batchId}`);
    console.log("Imported:", result);

    return result; // 🔴 INI WAJIB
  }

  return (
    <div>
      <h1>Import Gaji</h1>

      <PayrollImportForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
