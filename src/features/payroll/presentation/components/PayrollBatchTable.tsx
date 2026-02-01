// features/payroll/presentation/components/PayrollBatchTable.tsx
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import { Link } from "react-router-dom";

type Props = {
  data: PayrollBatch[];
};

export function PayrollBatchTable({ data }: Props) {
  if (data.length === 0) {
    return <p>Belum ada batch payroll.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Periode</th>
          <th>Nama Batch</th>
          <th>Nomor Gaji</th>
          <th>Tipe Pegawai</th>
          <th>Jumlah Pegawai</th>
          <th>Total Netto</th>
        </tr>
      </thead>
      <tbody>
        {data.map(batch => (
          <tr key={batch.id}>
            <td>{batch.periodeBayar}</td>
            <td>
              <Link to={`/payroll/batch/${batch.id}`}>
                {batch.namaBatch}
              </Link>
            </td>
            <td>{batch.nomorGaji}</td>
            <td>{batch.tipePegawai}</td>
            <td>{batch.jumlahTransaksi}</td>
            <td>{batch.totalNetto.toLocaleString("id-ID")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
