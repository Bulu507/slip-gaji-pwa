import { useState } from "react";
import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import type { PayrollImportResult } from "../../application/import/payroll-import.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";
import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";
import { toPeriode } from "@/lib/utils";

export type PayrollImportFormInput = {
  file: File;
  tipePegawai: EmployeeType;
  periodeBayar: string;
  namaBatch: string;
};

type Props = {
  onSubmit: (input: PayrollImportFormInput) => Promise<PayrollImportResult>;
  loading?: boolean;
  error?: string | null;
};

function getDefaultPeriode() {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
}

export function PayrollImportForm({ onSubmit, loading, error }: Props) {
  const def = getDefaultPeriode();

  const [file, setFile] = useState<File | null>(null);
  const [namaBatch, setNamaBatch] = useState("");
  const [month, setMonth] = useState<number>(def.month);
  const [year, setYear] = useState<number>(def.year);
  const [tipePegawai, setTipePegawai] = useState<EmployeeType>("PNS");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    await onSubmit({
      file,
      namaBatch,
      tipePegawai,
      periodeBayar: toPeriode(year, month),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nama Batch */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Nama Batch</label>
        <Input
          placeholder="Contoh: Gaji Pokok Januari 2026"
          value={namaBatch}
          onChange={(e) => setNamaBatch(e.target.value)}
        />
      </div>

      {/* Periode */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Bulan</label>
          <Select
            value={String(month)}
            onValueChange={(v) => setMonth(Number(v))}
          >
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

        <div className="space-y-1">
          <label className="text-sm font-medium">Tahun</label>
          <Select
            value={String(year)}
            onValueChange={(v) => setYear(Number(v))}
          >
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
      </div>

      {/* Tipe Pegawai */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Tipe Pegawai</label>
        <Select
          value={tipePegawai}
          onValueChange={(v) => setTipePegawai(v as EmployeeType)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PNS">PNS</SelectItem>
            <SelectItem value="TNI">TNI</SelectItem>
            <SelectItem value="PPPK">PPPK</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* File */}
      <div className="space-y-1">
        <label className="text-sm font-medium">File Excel Payroll</label>
        <Input
          className="bg-background"
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <p className="text-xs text-muted-foreground">
          Gunakan file resmi hasil unduhan aplikasi gaji.
        </p>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Action */}
      <Button type="submit" disabled={loading || !file} className="w-full">
        {loading ? "Mengimpor data…" : "Import Payroll"}
      </Button>
    </form>
  );
}
