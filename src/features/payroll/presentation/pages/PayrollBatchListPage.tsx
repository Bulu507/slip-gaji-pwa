import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { usePayrollBatchesByPeriode } from "../hooks/usePayrollBatchesByPeriode";
import { PayrollBatchFilterBar } from "../components/PayrollBatchFilterBar";
import { PayrollActiveFilterBadge } from "../components/PayrollActiveFilterBadge";
import { PayrollEmptyState } from "../components/PayrollEmptyState";
import { PayrollBatchTable } from "../components/PayrollBatchTable";
import { getCurrentPeriode, isValidPeriode } from "@/lib/utils";

export function PayrollBatchListPage() {
  const { data, isLoading, error } = usePayrollBatchesByPeriode();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const periode = params.get("periode");

  // 🔹 auto-init periode (ENTRY POINT AMAN)
  useEffect(() => {
    if (!periode) {
      const current = getCurrentPeriode();
      setParams({ periode: current }, { replace: true });
      return;
    }

    if (!isValidPeriode(periode)) {
      // invalid → user error (manual URL)
      navigate("/payroll", { replace: true });
    }
  }, [periode, setParams, navigate]);

  // ⛔️ tunggu sampai periode valid
  if (!periode || !isValidPeriode(periode)) {
    return null;
  }

  return (
    <div>
      <h1>Batch Payroll</h1>

      <div style={{ marginBottom: 16 }}>
        <Link to="/payroll/import">+ Import Payroll</Link>
      </div>

      <PayrollBatchFilterBar />
      <PayrollActiveFilterBadge />

      {isLoading && <div>Memuat data payroll…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!isLoading && !error && data.length === 0 && (
        <PayrollEmptyState periode={periode} />
      )}

      {!isLoading && data.length > 0 && (
        <PayrollBatchTable data={data} />
      )}
    </div>
  );
}
