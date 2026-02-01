// features/payroll/presentation/hooks/usePayrollBatches.ts
import { useEffect, useState } from "react";
import { GetPayrollBatchesService } from "../../application/query/get-payroll-batches.service";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";

export function usePayrollBatches() {
  const service = new GetPayrollBatchesService();

  const [data, setData] = useState<PayrollBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const result = await service.execute();
        setData(result);
      } catch (e: any) {
        setError(e.message ?? "Gagal memuat batch payroll");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading, error };
}
