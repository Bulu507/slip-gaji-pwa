import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { useNavigate } from "react-router-dom"
import {
  getTunkinPeriods,
  subscribeTunkinPeriods,
} from "../services/tunkin-period.service"
import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant"
import type { TunkinPeriod } from "../model/tunkin-period.model"

export default function TunkinPage() {
  const navigate = useNavigate()

  // ✅ LAZY INIT
  const [periods, setPeriods] = useState<TunkinPeriod[]>(() =>
    getTunkinPeriods()
  )

  // ✅ SUBSCRIBE ONLY
  useEffect(() => {
    const unsubscribe = subscribeTunkinPeriods(setPeriods)
    return unsubscribe
  }, [])

  // ✅ SORT PERIODE
  const displayPeriods = useMemo(() => {
    return [...periods].sort((a, b) => {
      if (a.tahun !== b.tahun) return b.tahun - a.tahun
      return b.bulan - a.bulan
    })
  }, [periods])

  const monthLabelMap = useMemo(() => {
    return MONTH_OPTIONS.reduce<Record<number, string>>((acc, m) => {
      acc[m.value] = m.label
      return acc
    }, {})
  }, [])

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Tunjangan Kinerja" }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Data Tunjangan Kinerja</h1>
        <Button onClick={() => navigate("/tunkin/import")}>
          Import Tunkin
        </Button>
      </div>

      {displayPeriods.length === 0 && (
        <Card className="p-6 text-sm text-muted-foreground">
          Belum ada data tunjangan kinerja
        </Card>
      )}

      <div className="grid gap-4">
        {displayPeriods.map((p) => (
          <Card
            key={p.id}
            className="p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">
                {monthLabelMap[p.bulan]} {p.tahun}
              </div>
              <div className="text-sm text-muted-foreground">
                {p.totalPegawai} pegawai · Total{" "}
                {p.totalTunkinBersih.toLocaleString("id-ID")}
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => navigate(`/tunkin/detail/${p.id}`)}
            >
              Detail
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
