import { Button } from "@/components/ui/button"

type Props = {
  onImport(file: File): void
}

export function EmployeeImport({ onImport }: Props) {
  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".xlsx,.xls"
        hidden
        id="employee-import"
        onChange={e => {
          if (e.target.files?.[0]) {
            onImport(e.target.files[0])
            e.target.value = "" // reset input
          }
        }}
      />
      <Button asChild>
        <label htmlFor="employee-import">Upload Excel</label>
      </Button>
    </div>
  )
}
