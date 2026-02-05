// PayrollSlipPage.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePayrollSlip } from "../hooks/usePayrollSlip";
import { PayrollSlipHeader } from "../components/PayrollSlipHeader";
import { PayrollSlipSummary } from "../components/PayrollSlipSummary";
import { PayrollSlipComponents } from "../components/PayrollSlipComponents";

export function PayrollSlipPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { batchId, nip } = useParams<{
    batchId: string;
    nip: string;
  }>();

  const { data, loading, error } = usePayrollSlip(batchId ?? "", nip ?? "");

  const backUrl =
    (location.state as { from?: string })?.from ?? `/payroll/batch/${batchId}`;

  if (!batchId || !nip) {
    return (
      <div className="p-6 text-destructive">Parameter slip tidak valid.</div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div>
        <Button onClick={() => navigate(backUrl)}>
          ← Kembali
        </Button>
      </div>

      {loading && <div className="text-muted-foreground">Memuat slip…</div>}

      {error && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <PayrollSlipHeader batch={data.batch} trx={data.transaction} />

          <PayrollSlipSummary
            totalPendapatan={data.totalPendapatan}
            totalPotongan={data.totalPotongan}
            gajiBersih={data.transaction.gajiBersih}
          />

          <PayrollSlipComponents title="Pendapatan" data={data.pendapatan} />

          <PayrollSlipComponents title="Potongan" data={data.potongan} />
        </div>
      )}
    </div>
  );
}
