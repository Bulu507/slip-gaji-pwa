import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { PreviewEmployee } from "../models/employee-import.model"

type Props = {
  data: PreviewEmployee[]
  showAction?: boolean
}

const ACTION_LABEL = {
  new: {
    text: "BARU",
    className: "text-green-600",
  },
  update: {
    text: "BERUBAH",
    className: "text-orange-600",
  },
  same: {
    text: "TIDAK BERUBAH",
    className: "text-muted-foreground",
  },
} as const

export default function ImportPreviewTable({
  data,
  showAction = false,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NIP</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead>Unit</TableHead>
          {showAction && <TableHead>Status</TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={showAction ? 5 : 4}
              className="text-center text-sm text-muted-foreground"
            >
              Tidak ada data untuk ditampilkan
            </TableCell>
          </TableRow>
        )}

        {data.map((row) => (
          <TableRow key={row.nip}>
            <TableCell>{row.nip}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.position}</TableCell>
            <TableCell>{row.unit}</TableCell>

            {showAction && row.action && (
              <TableCell>
                <span
                  className={`${ACTION_LABEL[row.action].className} text-xs`}
                >
                  {ACTION_LABEL[row.action].text}
                </span>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
