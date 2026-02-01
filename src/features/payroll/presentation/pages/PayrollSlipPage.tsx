// features/payroll/presentation/pages/PayrollSlipPage.tsx
import { useParams, Link } from "react-router-dom";
import { usePayrollSlip } from "../hooks/usePayrollSlip";
import { PayrollSlipHeader } from "../components/PayrollSlipHeader";
import { PayrollSlipSummary } from "../components/PayrollSlipSummary";
import { PayrollSlipComponents } from "../components/PayrollSlipComponents";

export function PayrollSlipPage() {
  const { batchId, nip } = useParams<{
    batchId: string;
    nip: string;
  }>();

  const { data, loading, error } = usePayrollSlip(
    batchId ?? "",
    nip ?? ""
  );

  if (!batchId || !nip) {
    return <p>Parameter slip tidak valid.</p>;
  }

  return (
    <div>
      <Link to={`/payroll/batch/${batchId}`}>← Kembali ke Batch</Link>

      {loading && <p>Memuat slip...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <PayrollSlipHeader
            batch={data.batch}
            trx={data.transaction}
          />

          <PayrollSlipSummary
            totalPendapatan={data.totalPendapatan}
            totalPotongan={data.totalPotongan}
            gajiBersih={data.transaction.gajiBersih}
          />

          <PayrollSlipComponents
            title="Pendapatan"
            data={data.pendapatan}
          />

          <PayrollSlipComponents
            title="Potongan"
            data={data.potongan}
          />
        </>
      )}
    </div>
  );
}
