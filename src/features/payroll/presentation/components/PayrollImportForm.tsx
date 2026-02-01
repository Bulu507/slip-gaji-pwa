// features/payroll/presentation/components/PayrollImportForm.tsx
import { useState } from "react";
import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import type { PayrollImportResult } from "../../application/import/payroll-import.types";

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

export function PayrollImportForm({ onSubmit, loading, error }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [namaBatch, setNamaBatch] = useState("");
  const [periodeBayar, setPeriodeBayar] = useState("");
  const [tipePegawai, setTipePegawai] =
    useState<EmployeeType>("PNS");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    await onSubmit({
      file,
      namaBatch,
      periodeBayar,
      tipePegawai,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama Batch</label>
        <input value={namaBatch} onChange={e => setNamaBatch(e.target.value)} />
      </div>

      <div>
        <label>Periode Bayar (YYYY-MM)</label>
        <input value={periodeBayar} onChange={e => setPeriodeBayar(e.target.value)} />
      </div>

      <div>
        <label>Tipe Pegawai</label>
        <select value={tipePegawai} onChange={e => setTipePegawai(e.target.value as EmployeeType)}>
          <option value="PNS">PNS</option>
          <option value="TNI">TNI</option>
          <option value="PPPK">PPPK</option>
        </select>
      </div>

      <div>
        <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Mengimpor..." : "Import"}
      </button>
    </form>
  );
}
