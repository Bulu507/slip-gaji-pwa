import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import { formatPeriode, formatRupiah, formatDateShort } from "@/lib/utils";

type Props = {
  batch: PayrollBatch;
};

export function PayrollBatchHeader({ batch }: Props) {
  return (
    <div className="border rounded-md p-4 bg-white space-y-3">
      {/* Judul */}
      <div>
        <h2 className="text-lg font-semibold">
          {batch.namaBatch ?? "Batch Payroll"}
        </h2>
        <div className="text-sm text-gray-600">
          Nomor Gaji: <b>{batch.nomorGaji}</b>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          Periode Bayar:{" "}
          <b>{formatPeriode(batch.periodeBayar)}</b>
        </div>
        <div>
          Tipe Pegawai: <b>{batch.tipePegawai}</b>
        </div>
        <div>
          Dibuat: <b>{formatDateShort(batch.createdAt)}</b>
        </div>
      </div>

      {/* Ringkasan Audit */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-md">
        <div>
          <div className="text-xs text-gray-600">
            Jumlah Transaksi
          </div>
          <div className="text-lg font-semibold">
            {batch.jumlahTransaksi}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-600">
            Total Netto
          </div>
          <div className="text-lg font-semibold">
            {formatRupiah(batch.totalNetto)}
          </div>
        </div>
      </div>
    </div>
  );
}
