import { Card } from "@/components/ui/card"

type Props = {
  total: number
  safe: number
  conflict: number
}

export default function ImportSummary({ total, safe, conflict }: Props) {
  return (
    <Card className="p-4 grid grid-cols-3 gap-4 text-center">
      <div>
        <div className="text-lg font-semibold">{total}</div>
        <div className="text-sm text-muted-foreground">Total Data</div>
      </div>

      <div>
        <div className="text-lg font-semibold text-green-600">{safe}</div>
        <div className="text-sm text-muted-foreground">Aman</div>
      </div>

      <div>
        <div className="text-lg font-semibold text-red-600">{conflict}</div>
        <div className="text-sm text-muted-foreground">Perlu Review</div>
      </div>
    </Card>
  )
}
