import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSalaryRawsByPeriodAsync } from "@/features/salaries/services/salary-raw.service";
import type { SalaryRaw } from "@/features/salaries/models/salary.model";
import { ArrowLeft } from "lucide-react";

export default function SalaryDetailPage() {
  const { periodId } = useParams<{ periodId: string }>();
  const navigate = useNavigate();
  const [salaryList, setSalaryList] = useState<SalaryRaw[]>([]);

  useEffect(() => {
    if (!periodId) return;

    getSalaryRawsByPeriodAsync(periodId).then(setSalaryList);
  }, [periodId]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Detail Gaji Periode {periodId}
        </h1>
        <Button variant="destructive" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {salaryList.length === 0 && (
        <Card className="p-4 text-muted-foreground">Belum ada data gaji</Card>
      )}

      {salaryList.length > 0 && (
        <Card className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Gaji Pokok</TableHead>
                <TableHead>Tunjangan Istri</TableHead>
                <TableHead>Tunjangan Anak</TableHead>
                <TableHead>Potongan PPh</TableHead>
                <TableHead>BPJS</TableHead>
                <TableHead>Bersih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaryList.map((item) => (
                <TableRow key={item.nogaji}>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nmpeg}</TableCell>
                  <TableCell className="text-right">
                    {item.gjpokok.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.tjistri.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.tjanak.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.tjpph.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.bpjs.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.bersih.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
