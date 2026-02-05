import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usePayrollBatchDetail } from "../hooks/usePayrollBatchDetail";
import { PayrollBatchHeader } from "../components/PayrollBatchHeader";
import { PayrollTransactionTable } from "../components/PayrollTransactionTable";
import { useDeletePayrollBatch } from "../hooks/useDeletePayrollBatch";
import { ConfirmDeleteBatchDialog } from "../components/ConfirmDeleteBatchDialog";
import { Button } from "@/components/ui/button";

export function PayrollBatchDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { batchId } = useParams<{ batchId: string }>();
  const { data, loading, error } = usePayrollBatchDetail(batchId ?? "");
  const { deleteBatch, loading: deleting } = useDeletePayrollBatch();

  if (!batchId) {
    return <div className="p-6 text-red-600">Batch ID tidak valid.</div>;
  }

  const backUrl = (location.state as { from?: string })?.from ?? "/payroll";

  async function handleDelete() {
    if (!batchId) return;

    await deleteBatch(batchId);
    navigate(backUrl);
  }

  return (
    <div className="space-y-4">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate(backUrl)}
        >
          ← Kembali
        </Button>

        <ConfirmDeleteBatchDialog
          loading={deleting}
          onConfirm={handleDelete}
        />
      </div>

      {/* Loading & error */}
      {loading && (
        <div className="p-4 text-muted-foreground">
          Memuat detail batch payroll…
        </div>
      )}

      {error && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {error}
        </div>
      )}

      {/* Content */}
      {data && (
        <div className="space-y-4">
          <PayrollBatchHeader batch={data.batch} />

          <div className="space-y-2">
            <h3 className="text-md font-semibold">
              Daftar Transaksi Pegawai
            </h3>
            <PayrollTransactionTable data={data.transactions} />
          </div>
        </div>
      )}
    </div>
  );
}
