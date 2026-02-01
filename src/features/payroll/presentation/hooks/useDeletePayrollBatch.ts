// features/payroll/presentation/hooks/useDeletePayrollBatch.ts
import { useState } from "react";
import { DeletePayrollBatchService } from "../../application/query/delete-payroll-batch.service";

export function useDeletePayrollBatch() {
  const service = new DeletePayrollBatchService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteBatch(batchId: string) {
    try {
      setLoading(true);
      setError(null);
      await service.execute(batchId);
    } catch (e: any) {
      setError(e.message ?? "Gagal menghapus batch payroll");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { deleteBatch, loading, error };
}
