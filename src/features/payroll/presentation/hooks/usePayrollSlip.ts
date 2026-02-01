// features/payroll/presentation/hooks/usePayrollSlip.ts
import { useEffect, useState } from "react";
import { GetPayrollSlipService } from "../../application/query/get-payroll-slip.service";
import type { PayrollSlip } from "../../application/query/get-payroll-slip.service";

export function usePayrollSlip(
  batchId: string,
  nip: string
) {
  const service = new GetPayrollSlipService();

  const [data, setData] = useState<PayrollSlip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!batchId || !nip) return;

    async function load() {
      try {
        setLoading(true);
        const result = await service.execute(batchId, nip);
        setData(result);
      } catch (e: any) {
        setError(e.message ?? "Gagal memuat slip gaji");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [batchId, nip]);

  return { data, loading, error };
}
