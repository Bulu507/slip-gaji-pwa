// features/payroll/presentation/components/PayrollBatchHeader.tsx
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";

type Props = {
  batch: PayrollBatch;
};

export function PayrollBatchHeader({ batch }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2>{batch.namaBatch}</h2>
      <p>
        Periode: <b>{batch.periodeBayar}</b> | Tipe:{" "}
        <b>{batch.tipePegawai}</b>
      </p>
      <p>
        Nomor Gaji: <b>{batch.nomorGaji}</b>
      </p>
      <p>
        Jumlah Pegawai: <b>{batch.jumlahTransaksi}</b> | Total Netto:{" "}
        <b>{batch.totalNetto.toLocaleString("id-ID")}</b>
      </p>
    </div>
  );
}
