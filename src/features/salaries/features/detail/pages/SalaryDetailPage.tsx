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

    let active = true;

    getSalaryRawsByPeriodAsync(periodId).then((data) => {
      if (active) setSalaryList(data);
    });

    return () => {
      active = false;
    };
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

      <Card className="p-4 overflow-x-auto">
        {salaryList.length === 0 ? (
          <div className="text-muted-foreground">Belum ada data gaji</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="text-right">Gaji Pokok</TableHead>
                <TableHead className="text-right">Tunj. Istri</TableHead>
                <TableHead className="text-right">Tunj. Anak</TableHead>
                <TableHead className="text-right">PPh</TableHead>
                <TableHead className="text-right">BPJS</TableHead>
                <TableHead className="text-right">Gaji Bersih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaryList.map((item) => (
                <TableRow key={`${item.nip}-${item.nogaji}`}>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nmpeg}</TableCell>
                  <TableCell className="text-right">
                    {item.gjpokok.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.tjistri.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.tjanak.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.tjpph.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.bpjs.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.bersih.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
