import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/utils";
import type { PayrollImportPreview } from "../../application/import/payroll-import.types";

type Props = {
  open: boolean;
  data: PayrollImportPreview;
  onConfirm: () => void;
  onCancel: () => void;
};

export function PayrollImportPreviewDialog({
  open,
  data,
  onConfirm,
  onCancel,
}: Props) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    if (!keyword.trim()) return data.rows;

    const q = keyword.toLowerCase();
    return data.rows.filter(
      (r) =>
        r.nip.toLowerCase().includes(q) || r.nama.toLowerCase().includes(q),
    );
  }, [keyword, data.rows]);

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Preview Import Payroll</DialogTitle>
        </DialogHeader>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <b>Nomor Gaji:</b> {data.nomorGaji}
          </div>
          <div>
            <b>Periode:</b> {data.periodeBayar}
          </div>
          <div>
            <b>Tipe:</b> {data.tipePegawai}
          </div>
          <div>
            <b>Total Baris:</b> {data.totalRows}
          </div>
        </div>

        {/* Search */}
        <div className="mt-3">
          <Input
            placeholder="Cari NIP atau Nama…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Scrollable table */}
        <div className="flex-1 overflow-y-auto border rounded-md mt-3">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted z-10">
              <tr>
                <th className="p-2 text-left">NIP</th>
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-right">Gaji Bersih</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.nip}>
                  <td className="p-2">{r.nip}</td>
                  <td className="p-2">{r.nama}</td>
                  <td className="p-2 text-right">
                    {formatRupiah(r.gajiBersih)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-3">
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button onClick={onConfirm}>Lanjutkan Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
