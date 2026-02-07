import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { usePayrollBatchDetail } from "../hooks/usePayrollBatchDetail";
import { PayrollBatchHeader } from "../components/PayrollBatchHeader";
import { PayrollTransactionTable } from "../components/PayrollTransactionTable";
import { useDeletePayrollBatch } from "../hooks/useDeletePayrollBatch";
import { ConfirmDeleteBatchDialog } from "../components/ConfirmDeleteBatchDialog";

export function PayrollBatchDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1️⃣ param mentah (SELALU string | undefined)
  const { batchId: rawBatchId } = useParams<{ batchId: string }>();

  // 2️⃣ hooks TIDAK BOLEH kondisional
  const { data, loading, error } = usePayrollBatchDetail(rawBatchId ?? "");
  const { deleteBatch, loading: deleting } = useDeletePayrollBatch();

  const [keyword, setKeyword] = useState("");

  // 3️⃣ useMemo SELALU dipanggil
  const filteredTransactions = useMemo(() => {
    if (!data) return [];

    const q = keyword.trim().toLowerCase();
    if (!q) return data.transactions;

    return data.transactions.filter((trx) =>
      trx.nip.toLowerCase().includes(q) ||
      trx.nama.toLowerCase().includes(q)
    );
  }, [data, keyword]);

  // 4️⃣ guard SETELAH semua hook
  if (!rawBatchId) {
    return (
      <div className="p-6 text-destructive">
        Batch ID tidak valid.
      </div>
    );
  }

  // 5️⃣ narrow ke string (INI KUNCI TS)
  const batchId = rawBatchId;

  const backUrl =
    (location.state as { from?: string })?.from ?? "/payroll";

  async function handleDelete() {
    await deleteBatch(batchId);
    navigate(backUrl);
  }

  return (
    <div className="space-y-4">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(backUrl)}>
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

          {/* Search */}
          <div className="max-w-sm">
            <Input
              placeholder="Cari NIP / Nama Pegawai…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-semibold">
              Daftar Transaksi Pegawai
            </h3>

            <PayrollTransactionTable
              data={filteredTransactions}
            />
          </div>
        </div>
      )}
    </div>
  );
}
