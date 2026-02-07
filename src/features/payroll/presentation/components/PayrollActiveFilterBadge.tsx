import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";

function labelBulan(month: number) {
  return MONTH_OPTIONS.find(m => m.value === month)?.label ?? month;
}

export function PayrollActiveFilterBadge() {
  const [params] = useSearchParams();
  const periode = params.get("periode");
  const tipe = params.get("tipe");

  if (!periode) return null;

  const [year, month] = periode.split("-").map(Number);

  return (
    <div className="flex gap-2">
      <Badge variant="secondary">
        Periode: {labelBulan(month)} {year}
      </Badge>
      {tipe && (
        <Badge variant="secondary">
          Tipe: {tipe}
        </Badge>
      )}
    </div>
  );
}
