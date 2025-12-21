import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

import type { SalaryImportMode } from "../models/salary-import.model";
import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";
import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";

export default function SalaryImportPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [bulan, setBulan] = useState<number | "">("");
  const [tahun, setTahun] = useState<number | "">("");
  const [mode, setMode] = useState<SalaryImportMode>("replace");

  const isPeriodReady = bulan !== "" && tahun !== "" && tahun >= 2000 && !!mode;

  const isReady = isPeriodReady && !!file;

  const handleFileUpload = (file: File) => {
    setFile(file);
  };

  const handleImport = () => {
    if (!isReady) return;

    console.log({ file, bulan, tahun, mode });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Breadcrumb
            items={[{ label: "Gaji", to: "/salary" }, { label: "Import Gaji" }]}
          />
          <h1 className="text-2xl font-semibold">Import Gaji</h1>
          <p className="text-sm text-muted-foreground">
            Seluruh perubahan data gaji hanya melalui import Excel
          </p>
        </div>

        <Button variant="destructive" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {/* FORM */}
      <div className="p-6 space-y-6">
        {/* PERIODE */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Periode / Bulan</label>
            <Select
              value={bulan !== "" ? String(bulan) : ""}
              onValueChange={(v) => setBulan(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih bulan" />
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Tahun</label>
            <Select
              value={tahun !== "" ? String(tahun) : ""}
              onValueChange={(v) => setTahun(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tahun" />
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

        {/* MODE */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mode Import</label>
          <Select
            value={mode}
            onValueChange={(v) => setMode(v as SalaryImportMode)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="replace">
                Ganti seluruh data periode
              </SelectItem>
              <SelectItem value="update">Update / tambah per NIP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* FILE */}
        <div className="space-y-2">
          <label className="text-sm font-medium">File Excel</label>

          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={!isPeriodReady || loading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {file ? file.name : "Pilih File Excel"}
          </Button>

          {!isPeriodReady && (
            <p className="text-xs text-muted-foreground">
              Pilih bulan, tahun, dan mode terlebih dahulu
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <Button disabled={!isReady} onClick={handleImport}>
            Import Gaji
          </Button>
        </div>
      </div>
    </div>
  );
}
