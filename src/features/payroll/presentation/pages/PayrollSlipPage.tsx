import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePayrollSlip } from "../hooks/usePayrollSlip";
import { PayrollSlipView } from "../components/PayrollSlipView";

export function PayrollSlipPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { batchId, nip } = useParams<{
    batchId?: string;
    nip?: string;
  }>();

  // ✅ HOOK SELALU DIPANGGIL
  const { data, loading, error } = usePayrollSlip(
    batchId ?? "",
    nip ?? ""
  );

  const backUrl =
    (location.state as { from?: string })?.from ??
    (batchId ? `/payroll/batch/${batchId}` : "/payroll");

  // ✅ VALIDASI SETELAH HOOK
  if (!batchId || !nip) {
    return (
      <div className="p-6 text-destructive">
        Parameter slip tidak valid.
      </div>
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

      {loading && (
        <div className="text-muted-foreground">
          Memuat slip…
        </div>
      )}

      {error && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {error}
        </div>
      )}

      {data && <PayrollSlipView slip={data} />}
    </div>
  );
}
