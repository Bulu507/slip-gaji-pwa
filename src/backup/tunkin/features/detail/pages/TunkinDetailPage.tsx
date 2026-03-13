import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft } from "lucide-react"

import type { TunkinRaw } from "@/features/tunkin/model/tunkin.model"
import { getTunkinRawsByPeriodAsync } from "@/features/tunkin/services/tunkin-raw.service"

export default function TunkinDetailPage() {
  const { periodId } = useParams<{ periodId: string }>()
  const navigate = useNavigate()
  const [tunkinList, setTunkinList] = useState<TunkinRaw[]>([])

  useEffect(() => {
    if (!periodId) return

    let active = true

    getTunkinRawsByPeriodAsync(periodId).then((data) => {
      if (active) setTunkinList(data)
    })

    return () => {
      active = false
    }
  }, [periodId])

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Detail Tunjangan Kinerja Periode {periodId}
        </h1>
        <Button variant="destructive" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      <Card className="p-4 overflow-x-auto">
        {tunkinList.length === 0 ? (
          <div className="text-muted-foreground">
            Belum ada data tunjangan kinerja
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Nilai Bruto</TableHead>
                <TableHead className="text-right">Potongan</TableHead>
                <TableHead className="text-right">Nilai Bersih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tunkinList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.kode_grade}</TableCell>
                  <TableCell className="text-right">
                    {item.nilai_bruto.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.nilai_potongan.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.nilai_bersih.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
