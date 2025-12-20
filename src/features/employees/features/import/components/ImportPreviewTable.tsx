import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PreviewEmployee } from "../models/import.model";

type Props = {
  data: PreviewEmployee[];
  showAction?: boolean;
};

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
        {data.map((row) => (
          <TableRow key={row.nip}>
            <TableCell>{row.nip}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.position}</TableCell>
            <TableCell>{row.unit}</TableCell>

            {showAction && (
              <TableCell>
                {row.action === "new" && (
                  <span className="text-green-600 text-xs">BARU</span>
                )}
                {row.action === "update" && (
                  <span className="text-orange-600 text-xs">BERUBAH</span>
                )}
                {row.action === "same" && (
                  <span className="text-muted-foreground text-xs">
                    TIDAK BERUBAH
                  </span>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
