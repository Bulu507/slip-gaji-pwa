import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";
import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";
import { EMPLOYEE_TYPES } from "@/lib/constants/employee-type.constant";
import { fromPeriode, toPeriode } from "@/lib/utils";

function getDefaultPeriode() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

export function PayrollBatchFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 inisialisasi dari URL / default
  const initial = searchParams.get("periode")
    ? fromPeriode(searchParams.get("periode")!)
    : getDefaultPeriode();

  const [month, setMonth] = useState<number>(initial.month);
  const [year, setYear] = useState<number>(initial.year);
  const [tipePegawai, setTipePegawai] = useState(
    searchParams.get("tipe") ?? ""
  );

  function handleApply() {
    const params: Record<string, string> = {
      periode: toPeriode(year, month),
    };

    if (tipePegawai) {
      params.tipe = tipePegawai;
    }

    setSearchParams(params);
  }

  function handleReset() {
    const def = getDefaultPeriode();
    setMonth(def.month);
    setYear(def.year);
    setTipePegawai("");
    setSearchParams({
      periode: toPeriode(def.year, def.month),
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 border rounded-md bg-white">
      {/* Bulan */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Bulan</label>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {MONTH_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tahun */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tahun</label>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tipe Pegawai */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tipe Pegawai</label>
        <select
          value={tipePegawai}
          onChange={(e) => setTipePegawai(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Semua</option>
          {EMPLOYEE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleApply}>Apply</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
