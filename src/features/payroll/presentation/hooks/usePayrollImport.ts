import { useState } from "react";
import { PayrollImportService } from "../../application/import/payroll-import.service";
import type {
  PayrollImportInput,
  PayrollImportResult,
  PayrollImportPreview,
} from "../../application/import/payroll-import.types";

export function usePayrollImport() {
  const service = new PayrollImportService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function preview(input: PayrollImportInput): Promise<PayrollImportPreview> {
    try {
      setError(null);
      setLoading(true);
      return await service.previewPayroll(input);
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function importPayroll(
    input: PayrollImportInput,
  ): Promise<PayrollImportResult> {
    try {
      setError(null);
      setLoading(true);
      return await service.importPayroll(input);
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { preview, importPayroll, loading, error };
}
