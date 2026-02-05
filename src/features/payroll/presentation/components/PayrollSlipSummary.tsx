// PayrollSlipSummary.tsx
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

type Props = {
  totalPendapatan: number;
  totalPotongan: number;
  gajiBersih: number;
};

export function PayrollSlipSummary({
  totalPendapatan,
  totalPotongan,
  gajiBersih,
}: Props) {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-4 pt-6">
        <div>
          <div className="text-sm text-muted-foreground">
            Total Pendapatan
          </div>
          <div className="font-semibold">
            {formatRupiah(totalPendapatan)}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">
            Total Potongan
          </div>
          <div className="font-semibold">
            {formatRupiah(totalPotongan)}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">
            Gaji Bersih
          </div>
          <div className="text-lg font-bold">
            {formatRupiah(gajiBersih)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
