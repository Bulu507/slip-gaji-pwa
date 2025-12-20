import type {
  ImportMode,
  ImportError,
  PreviewEmployee,
} from "../models/import.model"
import type { Employee } from "@/features/employees/models/employee.model"

import { parseEmployeeExcel } from "./excel-parser.service"
import { compareEmployees } from "./employee-compare.service"

type ImportResult =
  | { data: PreviewEmployee[]; error?: never }
  | { data?: never; error: ImportError }

export async function importEmployeeFromExcel(
  file: File,
  mode: ImportMode,
  existingEmployees: Employee[]
): Promise<ImportResult> {
  const rows = await parseEmployeeExcel(file)

  /** cek duplicate nip di file */
  const nipSet = new Set<string>()
  const duplicated: string[] = []

  rows.forEach((r) => {
    if (nipSet.has(r.nip)) duplicated.push(r.nip)
    nipSet.add(r.nip)
  })

  if (duplicated.length > 0) {
    return {
      error: {
        type: "DUPLICATE_NIP",
        duplicatedNips: duplicated,
      },
    }
  }

  /** mapping Excel → PreviewEmployee */
  const mapped: PreviewEmployee[] = rows.map((r) => ({
    employeeId: r.nip,
    name: r.nama,
    grade: r.golongan,
    gradeName: r.nama_golongan,
    jobTitle: r.jabatan,
    baseSalaryCode: r.kdgapok,
    maritalStatusCode: r.kdkawin,
    position: r.posisi,
    unit: r.unit,
    employmentType: r.tipe,
  }))

  if (mode === "replace") {
    return { data: mapped }
  }

  const compared = compareEmployees(mapped, existingEmployees)
  return { data: compared }
}
