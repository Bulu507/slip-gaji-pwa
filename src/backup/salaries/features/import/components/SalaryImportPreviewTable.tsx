import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import type { SalaryImportPreviewRow } from "../models/salary-import.model"

type Props = {
  rows: SalaryImportPreviewRow[]
  mode: string,
}

export function SalaryImportPreviewTable({ rows, mode }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NIP</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Gaji Pokok</TableHead>
          <TableHead>Bersih</TableHead>
          {mode === "update" && <TableHead>Status</TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => {
          let statusLabel = ""
          let statusClass = ""

          switch (row.action) {
            case "new":
              statusLabel = "Baru"
              statusClass = "text-green-600 font-semibold"
              break
            case "update":
              statusLabel = "Berubah"
              statusClass = "text-orange-600 font-semibold"
              break
            default:
              statusLabel = "Tidak Berubah"
              statusClass = "text-gray-400"
          }

          return (
            <TableRow key={row.nip}>
              <TableCell>{row.nip}</TableCell>
              <TableCell>{row.nmpeg}</TableCell>
              <TableCell>{row.gjpokok}</TableCell>
              <TableCell>{row.bersih}</TableCell>
              {mode === "update" && <TableCell className={statusClass}>{statusLabel}</TableCell>}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
