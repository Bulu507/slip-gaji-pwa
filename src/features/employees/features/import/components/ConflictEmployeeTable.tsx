import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { EmployeeDiff } from "../models/employee-diff.model"

type Props = {
  data: EmployeeDiff[]
  onApprove: (nip: string, approved: boolean) => void
}

export default function ConflictEmployeeTable({ data, onApprove }: Props) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Data Perlu Review</h3>

      {data.map(item => (
        <div
          key={item.id}
          className="border p-3 rounded mb-3 space-y-2"
        >
          <div className="text-sm font-medium">
            NIP: {item.id}
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">Old:</span>{" "}
            {item.existing?.name} – {item.existing?.position}
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">New:</span>{" "}
            {item.incoming.name} – {item.incoming.position}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onApprove(item.id, true)}
            >
              Setujui
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onApprove(item.id, false)}
            >
              Tolak
            </Button>
          </div>
        </div>
      ))}
    </Card>
  )
}
