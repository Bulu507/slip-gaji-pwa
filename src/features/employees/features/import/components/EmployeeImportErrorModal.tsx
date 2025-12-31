import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { EmployeeImportErrorRow } from "../models/employee-import-error.model"
import { buildEmployeeImportErrorExcel } from "../services/employee-error-excel.service"

type Props = {
  open: boolean
  errors: EmployeeImportErrorRow[]
  onClose: () => void
}

export function EmployeeImportErrorModal({
  open,
  errors,
  onClose,
}: Props) {
  const handleDownload = () => {
    const blob = buildEmployeeImportErrorExcel(errors)

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "error-import-pegawai.xlsx"
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Import Pegawai Gagal
          </DialogTitle>
          <DialogDescription>
            Ditemukan <b>{errors.length}</b> data bermasalah.
            <br />
            Import tidak dapat dilanjutkan sebelum data diperbaiki.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-60 overflow-auto border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0">
              <tr>
                <th className="p-2 text-left">Baris</th>
                <th className="p-2 text-left">NIP</th>
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Alasan</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((e, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{e.rowIndex}</td>
                  <td className="p-2">{e.nip || "-"}</td>
                  <td className="p-2">{e.name || "-"}</td>
                  <td className="p-2 text-destructive">{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button variant="destructive" onClick={handleDownload}>
            Download Excel Error
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
