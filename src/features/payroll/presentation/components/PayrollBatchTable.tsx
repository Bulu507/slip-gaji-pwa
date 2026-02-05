import { useLocation, useNavigate } from "react-router-dom";
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import { formatRupiah, formatPeriode, formatDateShort } from "@/lib/utils";

type Props = {
  data: PayrollBatch[];
};

export function PayrollBatchTable({ data }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full bg-background border-collapse text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Nomor Gaji</th>
            <th className="text-left p-3 border-b">Nama Batch</th>
            <th className="text-left p-3 border-b">Periode Bayar</th>
            <th className="text-left p-3 border-b">Tipe</th>
            <th className="text-right p-3 border-b">Transaksi</th>
            <th className="text-right p-3 border-b">Total Netto</th>
            <th className="text-left p-3 border-b">Dibuat</th>
          </tr>
        </thead>

        <tbody>
          {data.map((batch) => (
            <tr
              key={batch.id}
              className="hover:bg-gray-50 cursor-pointer"
              title="Klik untuk lihat detail batch"
              onClick={() =>
                navigate(`/payroll/batch/${batch.id}`, {
                  state: {
                    from: location.pathname + location.search,
                  },
                })
              }
            >
              <td className="p-3 border-b font-medium">{batch.nomorGaji}</td>
              <td className="p-3 border-b">{batch.namaBatch ?? "—"}</td>
              <td className="p-3 border-b">
                {formatPeriode(batch.periodeBayar)}
              </td>
              <td className="p-3 border-b">{batch.tipePegawai}</td>
              <td className="p-3 border-b text-right">
                {batch.jumlahTransaksi}
              </td>
              <td className="p-3 border-b text-right font-semibold">
                {formatRupiah(batch.totalNetto)}
              </td>
              <td className="p-3 border-b">
                {formatDateShort(batch.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
