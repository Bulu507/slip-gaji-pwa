import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Props = {
  value: "UPDATE" | "REPLACE"
  onChange: (value: "UPDATE" | "REPLACE") => void
}

export default function ImportModeSelector({ value, onChange }: Props) {
  return (
    <Card className="p-4 flex gap-2">
      <Button
        variant={value === "UPDATE" ? "default" : "outline"}
        onClick={() => onChange("UPDATE")}
      >
        Update Data
      </Button>

      <Button
        variant={value === "REPLACE" ? "destructive" : "outline"}
        onClick={() => onChange("REPLACE")}
      >
        Replace Semua
      </Button>
    </Card>
  )
}
