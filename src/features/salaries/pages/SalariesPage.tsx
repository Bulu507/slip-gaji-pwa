import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { useNavigate } from "react-router-dom"
import type { SalaryPeriod } from "../models/salary-period.model"
import {
  getSalaryPeriods,
  subscribeSalaryPeriods,
} from "../services/salary-period.service"
import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant"

export default function SalariesPage() {
  const navigate = useNavigate()

  // ✅ LAZY INIT (NO EFFECT)
  const [periods, setPeriods] = useState<SalaryPeriod[]>(() =>
    getSalaryPeriods()
  )

  // ✅ SUBSCRIBE ONLY
  useEffect(() => {
    const unsubscribe = subscribeSalaryPeriods(setPeriods)
    return unsubscribe
  }, [])

  // ✅ DERIVED DATA
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
      <Breadcrumb items={[{ label: "Gaji" }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Data Gaji</h1>
        <Button onClick={() => navigate("/salary/import")}>
          Import Gaji
        </Button>
      </div>

      {displayPeriods.length === 0 && (
        <Card className="p-6 text-sm text-muted-foreground">
          Belum ada data gaji
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
                {p.totalGajiBersih.toLocaleString("id-ID")}
              </div>
            </div>

            <Button variant="outline" size="sm">
              Detail
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
