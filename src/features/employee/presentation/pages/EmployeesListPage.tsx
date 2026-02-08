import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";

import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";
import {
  EMPLOYEE_TYPES,
  EMPLOYEE_TYPE_LABEL,
  type EmployeeType,
} from "@/lib/constants/employee-type.constant";
import type { Employee } from "../../domain/models/employee.model";
import { EmployeeRepository } from "../../data/repositories/employee.repository";


export function EmployeesListPage() {
  const navigate = useNavigate();

  const [year, setYear] = useState<number>(YEAR_OPTIONS[0].value);
  const [keyword, setKeyword] = useState("");
  const [tipePegawai, setTipePegawai] =
    useState<EmployeeType | "ALL">("ALL");

  const [items, setItems] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== LOAD DATA (PER TAHUN) =====
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const repo = new EmployeeRepository(year);
        const data = await repo.getAll();

        setItems(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setError("Gagal memuat data pegawai");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [year]);

  // ===== FILTER UI-ONLY =====
  const filtered = useMemo(() => {
    const q = keyword.toLowerCase().trim();

    return items.filter((e) => {
      const matchKeyword =
        !q ||
        e.nip.includes(q) ||
        e.nama.toLowerCase().includes(q);

      const matchTipe =
        tipePegawai === "ALL" || e.tipe_pegawai === tipePegawai;

      return matchKeyword && matchTipe;
    });
  }, [items, keyword, tipePegawai]);

  return (
    <div className="space-y-4">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Data Pegawai</h1>

        <Button onClick={() => navigate("/employees/sync")}>
          Sinkronisasi Pegawai
        </Button>
      </div>

      {/* ===== FILTER ===== */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex flex-wrap gap-3 items-end">
            {/* Tahun (DATA) */}
            <Select
              value={String(year)}
              onValueChange={(v) => setYear(Number(v))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEAR_OPTIONS.map((y) => (
                  <SelectItem
                    key={y.value}
                    value={String(y.value)}
                  >
                    {y.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tipe Pegawai (UI-only) */}
            <Select
              value={tipePegawai}
              onValueChange={(v) =>
                setTipePegawai(v as EmployeeType | "ALL")
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Semua Tipe Pegawai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">
                  Semua Tipe Pegawai
                </SelectItem>
                {EMPLOYEE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {EMPLOYEE_TYPE_LABEL[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search */}
            <Input
              placeholder="Cari NIP / Nama"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* ===== CONTENT ===== */}
      {loading && (
        <div className="text-muted-foreground">
          Memuat data pegawai…
        </div>
      )}

      {error && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <Alert>
          Tidak ada data pegawai untuk tahun ini.
          <br />
          Pastikan data gaji sudah di-import dan
          sinkronisasi pegawai sudah dilakukan.
        </Alert>
      )}

      {!loading && filtered.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Tipe Pegawai</TableHead>
              <TableHead>Periode Terakhir</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((e) => (
              <TableRow
                key={e.nip}
                className="cursor-pointer hover:bg-muted"
                onClick={() =>
                  navigate(`/employees/${e.nip}`)
                }
              >
                <TableCell>{e.nip}</TableCell>
                <TableCell>{e.nama}</TableCell>
                <TableCell>
                  {EMPLOYEE_TYPE_LABEL[e.tipe_pegawai]}
                </TableCell>
                <TableCell>{e.last_seen_period}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
