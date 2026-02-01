// features/payroll/presentation/hooks/usePayrollImport.ts
import { useState } from "react";
import { PayrollImportService } from "../../application/import/payroll-import.service";
import type { PayrollImportInput } from "../../application/import/payroll-import.types";

export function usePayrollImport() {
  const service = new PayrollImportService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function importPayroll(input: PayrollImportInput) {
    try {
      setLoading(true);
      setError(null);
      return await service.importPayroll(input);
    } catch (e: any) {
      setError(e.message ?? "Gagal import payroll");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { importPayroll, loading, error };
}
