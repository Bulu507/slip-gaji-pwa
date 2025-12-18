import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ChangeEvent } from "react"

type Props = {
  onFileSelected: (file: File) => void
}

export default function ImportUploader({ onFileSelected }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".xlsx")) {
      alert("File harus berformat .xlsx")
      return
    }

    onFileSelected(file)
  }

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="font-semibold">Upload File Excel</h3>
        <p className="text-sm text-muted-foreground">
          Format .xlsx sesuai template pegawai
        </p>
      </div>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleChange}
      />

      <Button variant="secondary">
        Pilih File
      </Button>
    </Card>
  )
}
