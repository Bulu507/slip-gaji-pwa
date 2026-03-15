import { Input } from "@/components/ui/input"

interface Props {
  search: string
  onSearchChange: (v: string) => void
}

export function EmployeeFilterBar({ search, onSearchChange }: Props) {

  return (

    <div className="flex gap-3">

      <Input
        placeholder="Cari NIP atau Nama..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

    </div>

  )

}