// features/payroll/presentation/pages/PayrollBatchDetailPage.tsx
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { usePayrollBatchDetail } from "../hooks/usePayrollBatchDetail";
import { PayrollBatchHeader } from "../components/PayrollBatchHeader";
import { PayrollTransactionTable } from "../components/PayrollTransactionTable";
import { useDeletePayrollBatch } from "../hooks/useDeletePayrollBatch";

export function PayrollBatchDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { batchId } = useParams<{ batchId: string }>();
  const { data, loading, error } = usePayrollBatchDetail(batchId ?? "");
  const { deleteBatch, loading: deleting } = useDeletePayrollBatch();

  if (!batchId) {
    return <p>Batch ID tidak valid.</p>;
  }

  async function handleDelete() {
    if (!batchId) return;

    const confirmed = window.confirm(
      "PERINGATAN!\n\n" +
        "Anda akan menghapus seluruh batch payroll beserta seluruh transaksi di dalamnya.\n" +
        "Tindakan ini TIDAK DAPAT dibatalkan.\n\n" +
        "Apakah Anda yakin?",
    );

    if (!confirmed) return;

    await deleteBatch(batchId);
    navigate("/payroll");
  }

  const backUrl =
    (location.state as { from?: string })?.from ?? "/payroll";

  return (
    <div>
      <Link to={backUrl}>← Kembali ke Batch</Link>

      {loading && <p>Memuat detail batch...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <PayrollBatchHeader batch={data.batch} />
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{ color: "red", marginBottom: 16 }}
          >
            Hapus Batch
          </button>
          <PayrollTransactionTable data={data.transactions} />
        </>
      )}
    </div>
  );
}
