import { useNavigate, useLocation } from "react-router-dom";
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatPeriode, formatRupiah } from "@/lib/utils";

type Props = {
  data: PayrollTransaction[];
};

export function PayrollTransactionTable({ data }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  if (data.length === 0) {
    return (
      <div className="border rounded-md p-4 text-muted-foreground">
        Tidak ada transaksi pada batch ini.
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NIP</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Periode Hak</TableHead>
            <TableHead>Periode Bayar</TableHead>
            <TableHead className="text-right">
              Gaji Bersih
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((trx) => (
            <TableRow
              key={trx.id}
              className="cursor-pointer hover:bg-muted/50"
              title="Klik untuk melihat slip pegawai"
              onClick={() =>
                navigate(
                  `/payroll/batch/${trx.batchId}/${trx.nip}`,
                  {
                    state: {
                      from: location.pathname,
                    },
                  }
                )
              }
            >
              <TableCell className="font-medium">
                {trx.nip}
              </TableCell>
              <TableCell>{trx.nama}</TableCell>
              <TableCell>
                {formatPeriode(trx.periodeHak)}
              </TableCell>
              <TableCell>
                {formatPeriode(trx.periodeBayar)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatRupiah(trx.gajiBersih)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
