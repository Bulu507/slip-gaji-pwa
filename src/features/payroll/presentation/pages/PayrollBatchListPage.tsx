// PayrollBatchListPage.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      setParams({ periode: getCurrentPeriode() }, { replace: true });
      return;
    }

    if (!isValidPeriode(periode)) {
      navigate("/payroll", { replace: true });
    }
  }, [periode, setParams, navigate]);

  if (!periode || !isValidPeriode(periode)) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Batch Payroll</h1>
        <Button onClick={() => navigate("/payroll/import")}>
          + Import Payroll
        </Button>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <PayrollBatchFilterBar />
          <PayrollActiveFilterBadge />
        </CardContent>
      </Card>

      {/* Content */}
      {isLoading && (
        <div className="text-muted-foreground">
          Memuat data payroll…
        </div>
      )}

      {error && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {error}
        </div>
      )}

      {!isLoading && !error && data.length === 0 && (
        <PayrollEmptyState periode={periode} />
      )}

      {!isLoading && data.length > 0 && (
        <PayrollBatchTable data={data} />
      )}
    </div>
  );
}
