// PayrollSlipComponents.tsx
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";

type Props = {
  title: string;
  data: PayrollTransaction["components"];
};

export function PayrollSlipComponents({ title, data }: Props) {
  return (
    <div>
      <h4>{title}</h4>
      <table>
        <thead>
          <tr>
            <th>Komponen</th>
            <th>Nilai</th>
          </tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.kode}>
              <td>{c.nama}</td>
              <td>{c.nilai.toLocaleString("id-ID")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
