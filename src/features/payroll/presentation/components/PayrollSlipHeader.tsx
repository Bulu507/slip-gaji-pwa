// PayrollSlipHeader.tsx
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";

type Props = {
  batch: PayrollBatch;
  trx: PayrollTransaction;
};

export function PayrollSlipHeader({ batch, trx }: Props) {
  return (
    <div>
      <h2>Slip Gaji</h2>
      <p><b>Nama:</b> {trx.nama}</p>
      <p><b>NIP:</b> {trx.nip}</p>
      <p><b>Periode Bayar:</b> {batch.periodeBayar}</p>
      <p><b>Batch:</b> {batch.namaBatch}</p>
    </div>
  );
}
