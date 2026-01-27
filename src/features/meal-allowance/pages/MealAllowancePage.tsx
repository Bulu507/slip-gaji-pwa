import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant";
import type { MealAllowancePeriod } from "../models/meal-allowance-period.model";
import {
  getMealAllowancePeriods,
  subscribeMealAllowancePeriods,
} from "../services/meal-allowance-period.service";

export default function MealAllowancePage() {
  const navigate = useNavigate();

  // ✅ LAZY INIT (NO EFFECT)
  const [periods, setPeriods] = useState<MealAllowancePeriod[]>(() =>
    getMealAllowancePeriods(),
  );

  // ✅ SUBSCRIBE ONLY
  useEffect(() => {
    const unsubscribe = subscribeMealAllowancePeriods(setPeriods);
    return unsubscribe;
  }, []);

  // ✅ DERIVED DATA
  const displayPeriods = useMemo(() => {
    return [...periods].sort((a, b) => {
      if (a.tahun !== b.tahun) return b.tahun - a.tahun;
      return b.bulan - a.bulan;
    });
  }, [periods]);

  const monthLabelMap = useMemo(() => {
    return MONTH_OPTIONS.reduce<Record<number, string>>((acc, m) => {
      acc[m.value] = m.label;
      return acc;
    }, {});
  }, []);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Uang Makan" }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Data Uang Makan</h1>
        <Button onClick={() => navigate("/meal-allowance/import")}>
          Import Uang Makan
        </Button>
      </div>

      {displayPeriods.length === 0 && (
        <Card className="p-6 text-sm text-muted-foreground">
          Belum ada data uang makan
        </Card>
      )}

      <div className="grid gap-4">
        {displayPeriods.map((p) => (
          <Card key={p.id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">
                {monthLabelMap[p.bulan]} {p.tahun}
              </div>
              <div className="text-sm text-muted-foreground">
                {p.totalPegawai} pegawai · Total{" "}
                {p.totalUangMakan.toLocaleString("id-ID")}
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => navigate(`/meal-allowance/${p.id}`)}
            >
              Detail
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
