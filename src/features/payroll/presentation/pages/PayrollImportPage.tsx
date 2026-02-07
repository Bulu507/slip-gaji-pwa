import type { PayrollImportResult } from "../../application/import/payroll-import.types";
import {
  PayrollImportForm,
  type PayrollImportFormInput,
} from "../components/PayrollImportForm";
import { usePayrollImport } from "../hooks/usePayrollImport";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function PayrollImportPage() {
  const { importPayroll, loading, error } = usePayrollImport();

  async function handleSubmit(
    input: PayrollImportFormInput,
  ): Promise<PayrollImportResult> {
    return await importPayroll(input);
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Import Gaji Payroll</CardTitle>
          <p className="text-sm text-muted-foreground">
            Import data gaji dari file Excel resmi. Pastikan periode dan tipe
            pegawai sesuai dengan file yang diunggah.
          </p>
        </CardHeader>

        <CardContent>
          <PayrollImportForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
