// features/payroll/presentation/hooks/usePayrollBatchDetail.ts
import { useEffect, useState } from "react";
import { GetPayrollBatchDetailService } from "../../application/query/get-payroll-batch-detail.service";
import type { PayrollBatchDetail } from "../../application/query/get-payroll-batch-detail.service";

export function usePayrollBatchDetail(batchId: string) {
  const service = new GetPayrollBatchDetailService();

  const [data, setData] = useState<PayrollBatchDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!batchId) return; // ⬅️ guard di dalam hook

    async function load() {
      try {
        setLoading(true);
        const result = await service.execute(batchId);
        setData(result);
      } catch (e: any) {
        setError(e.message ?? "Gagal memuat detail batch");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [batchId]);

  return { data, loading, error };
}

