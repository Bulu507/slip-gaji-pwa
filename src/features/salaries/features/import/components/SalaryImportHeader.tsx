/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type Props = {
  value: {
    bulan: number
    tahun: number
    mode: "replace" | "update"
  }
  onChange: (v: Props["value"]) => void
}

export default function SalaryImportHeader({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Select
        value={String(value.bulan)}
        onValueChange={(v) =>
          onChange({ ...value, bulan: Number(v) })
        }
      >
        <option value="">Bulan</option>
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </Select>

      <Input
        type="number"
        placeholder="Tahun"
        value={value.tahun || ""}
        onChange={(e) =>
          onChange({ ...value, tahun: Number(e.target.value) })
        }
      />

      <Select
        value={value.mode}
        onValueChange={(v) =>
          onChange({ ...value, mode: v as any })
        }
      >
        <option value="replace">Replace</option>
        <option value="update">Update</option>
      </Select>
    </div>
  )
}
