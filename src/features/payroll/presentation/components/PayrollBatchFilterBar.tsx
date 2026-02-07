// PayrollBatchFilterBar.tsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";
import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";
import { EMPLOYEE_TYPES } from "@/lib/constants/employee-type.constant";
import { fromPeriode, toPeriode } from "@/lib/utils";

function getDefaultPeriode() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

export function PayrollBatchFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initial = searchParams.get("periode")
    ? fromPeriode(searchParams.get("periode")!)
    : getDefaultPeriode();

  const [month, setMonth] = useState(String(initial.month));
  const [year, setYear] = useState(String(initial.year));
  const [tipePegawai, setTipePegawai] = useState(
    searchParams.get("tipe") ?? "ALL",
  );

  function handleApply() {
    const params: Record<string, string> = {
      periode: toPeriode(Number(year), Number(month)),
    };

    if (tipePegawai !== "ALL") {
      params.tipe = tipePegawai;
    }

    setSearchParams(params);
  }

  function handleReset() {
    const def = getDefaultPeriode();
    setMonth(String(def.month));
    setYear(String(def.year));
    setTipePegawai("ALL");

    setSearchParams({
      periode: toPeriode(def.year, def.month),
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      {/* Bulan */}
      <div className="w-[180px]">
        <label className="text-sm font-medium">Bulan</label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTH_OPTIONS.map((m) => (
              <SelectItem key={m.value} value={String(m.value)}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tahun */}
      <div className="w-[120px]">
        <label className="text-sm font-medium">Tahun</label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEAR_OPTIONS.map((y) => (
              <SelectItem key={y.value} value={String(y.value)}>
                {y.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tipe Pegawai */}
      <div className="w-[160px]">
        <label className="text-sm font-medium">Tipe Pegawai</label>
        <Select value={tipePegawai} onValueChange={setTipePegawai}>
          <SelectTrigger>
            <SelectValue placeholder="Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua</SelectItem>
            {EMPLOYEE_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
