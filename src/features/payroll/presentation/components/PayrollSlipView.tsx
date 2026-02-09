import { PayrollSlipHeader } from "./PayrollSlipHeader";
import { PayrollSlipSummary } from "./PayrollSlipSummary";
import { PayrollSlipComponents } from "./PayrollSlipComponents";
import type { PayrollSlip } from "../../application/query/get-payroll-slip.service";

type Props = {
  slip: PayrollSlip;
};

export function PayrollSlipView({ slip }: Props) {
  return (
    <div className="space-y-4">
      <PayrollSlipHeader
        batch={slip.batch}
        trx={slip.transaction}
      />

      <PayrollSlipSummary
        totalPendapatan={slip.totalPendapatan}
        totalPotongan={slip.totalPotongan}
        gajiBersih={slip.batch.totalNetto}
      />

      <PayrollSlipComponents
        title="Pendapatan"
        data={slip.pendapatan}
      />

      <PayrollSlipComponents
        title="Potongan"
        data={slip.potongan}
      />
    </div>
  );
}
