import type { SalaryImportPreviewRow } from "../models/salary-import.model"

type Props = {
  data: SalaryImportPreviewRow[]
  mode: string,
}

export function SalaryImportHeader({ data, mode }: Props) {
  const total = data.length
  const newCount = data.filter((d) => d.action === "new").length
  const updateCount = data.filter((d) => d.action === "update").length

  return (
    <div className="bg-background flex gap-6 rounded-lg border p-4 text-sm">
      <div>
        <p className="text-muted-foreground">Total Data</p>
        <p className="font-semibold">{total}</p>
      </div>
      { mode === "update" && <>
        <div>
          <p className="text-muted-foreground">Data Baru</p>
          <p className="font-semibold text-green-600">{newCount}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Data Berubah</p>
          <p className="font-semibold text-orange-600">{updateCount}</p>
        </div>
      </>}
    </div>
  )
}
