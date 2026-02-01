// features/payroll/presentation/components/PayrollTransactionTable.tsx
import { Link } from "react-router-dom";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";

type Props = {
  data: PayrollTransaction[];
};

export function PayrollTransactionTable({ data }: Props) {
  if (data.length === 0) {
    return <p>Tidak ada transaksi pada batch ini.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>NIP</th>
          <th>Nama</th>
          <th>Periode Hak</th>
          <th>Periode Bayar</th>
          <th>Gaji Bersih</th>
        </tr>
      </thead>
      <tbody>
        {data.map(trx => (
          <Link to={`/payroll/batch/${trx.batchId}/${trx.nip}`}>
            <tr key={trx.id}>
              <td>{trx.nip}</td>
              <td>{trx.nama}</td>
              <td>{trx.periodeHak}</td>
              <td>{trx.periodeBayar}</td>
              <td>{trx.gajiBersih.toLocaleString("id-ID")}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
}
