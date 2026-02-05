import { useSearchParams } from "react-router-dom";
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
    <div className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md inline-flex gap-2">
      <span>
        Periode: <strong>{labelBulan(month)} {year}</strong>
      </span>
      {tipe && (
        <span>
          • Tipe: <strong>{tipe}</strong>
        </span>
      )}
    </div>
  );
}
