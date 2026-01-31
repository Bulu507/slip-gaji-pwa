import type { PreviewEmployee } from "../models/employee-import.model"

type Props = {
  data: PreviewEmployee[]
}

const ACTION_COLOR = {
  new: "text-green-600",
  update: "text-orange-600",
  same: "text-muted-foreground",
} as const

export default function ImportSummaryBox({ data }: Props) {
  const total = data.length
  const newCount = data.filter((d) => d.action === "new").length
  const updateCount = data.filter((d) => d.action === "update").length
  const sameCount = data.filter((d) => d.action === "same").length

  return (
    <div className="bg-background flex gap-6 rounded-lg border p-4 text-sm">
      <div>
        <p className="text-muted-foreground">Total Data</p>
        <p className="font-semibold">{total}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Data Baru</p>
        <p className={`font-semibold ${ACTION_COLOR.new}`}>{newCount}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Data Berubah</p>
        <p className={`font-semibold ${ACTION_COLOR.update}`}>{updateCount}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Tidak Berubah</p>
        <p className={`font-semibold ${ACTION_COLOR.same}`}>{sameCount}</p>
      </div>
    </div>
  )
}
