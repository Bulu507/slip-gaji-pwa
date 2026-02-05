import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import { GetPayrollBatchesByPeriodeService } from "../../application/query/get-payroll-batches-by-periode.service";

type State = {
  data: PayrollBatch[];
  isLoading: boolean;
  error: string | null;
};

export function usePayrollBatchesByPeriode() {
  const [searchParams] = useSearchParams();

  const periodeBayar = searchParams.get("periode");
  const tipePegawai = searchParams.get("tipe") as EmployeeType | null;

  const [state, setState] = useState<State>({
    data: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!periodeBayar) return;

    let cancelled = false;
    const service = new GetPayrollBatchesByPeriodeService();

    (async () => {
      try {
        if (!cancelled) {
          setState(prev => ({ ...prev, isLoading: true }));
        }

        const data = await service.execute({
          periodeBayar,
          tipePegawai: tipePegawai ?? undefined,
        });

        if (!cancelled) {
          setState({
            data,
            isLoading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[Payroll] load batches failed", err);
          setState({
            data: [],
            isLoading: false,
            error: "Gagal memuat data payroll",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [periodeBayar, tipePegawai]);

  return state;
}
