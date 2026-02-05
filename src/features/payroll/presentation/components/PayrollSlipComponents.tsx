// PayrollSlipComponents.tsx
import type { PayrollTransaction } from "../../domain/models/payroll-transaction.model";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

type Props = {
  title: string;
  data: PayrollTransaction["components"];
};

export function PayrollSlipComponents({ title, data }: Props) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-2">
        <h4 className="font-semibold">{title}</h4>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Komponen</TableHead>
              <TableHead className="text-right">
                Nilai
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((c) => (
              <TableRow key={c.kode}>
                <TableCell>{c.nama}</TableCell>
                <TableCell className="text-right">
                  {formatRupiah(c.nilai)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
