// PayrollSlipHeader.tsx
import type { PayrollBatch } from "../../domain/models/payroll-batch.model";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPeriode } from "@/lib/utils";

type Props = {
  batch: PayrollBatch;
  trx: PayrollTransaction;
};

export function PayrollSlipHeader({ batch, trx }: Props) {
  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <div>
          <h2 className="text-lg font-semibold">Slip Gaji</h2>
          <p className="text-sm text-muted-foreground">
            Periode Bayar {formatPeriode(batch.periodeBayar)}
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Nama</div>
            <div className="font-medium">{trx.nama}</div>
          </div>
          <div>
            <div className="text-muted-foreground">NIP</div>
            <div className="font-medium">{trx.nip}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Batch</div>
            <div className="font-medium">
              {batch.namaBatch ?? batch.nomorGaji}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
