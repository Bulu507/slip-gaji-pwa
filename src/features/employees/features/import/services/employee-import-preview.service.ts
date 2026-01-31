import type {
  ImportMode,
  PreviewEmployee,
} from "../models/employee-import.model"
import type { Employee } from "@/features/employees/models/employee.model"

import { parseEmployeeExcel } from "./employee-excel-parser.service"
import { compareEmployees } from "./employee-compare.service"
import { validateDuplicateNip } from "./employee-validation.service"

export type ImportPreviewError = {
  type: "DUPLICATE_NIP"
  duplicatedNips: string[]
}

export type ImportPreviewResult =
  | { data: PreviewEmployee[]; error?: never }
  | { data?: never; error: ImportPreviewError }

/**
 * Preview import pegawai dari Excel
 * - parse
 * - validate
 * - mapping
 * - compare (jika update)
 */
export async function previewEmployeeImport(
  file: File,
  mode: ImportMode,
  existingEmployees: Employee[]
): Promise<ImportPreviewResult> {
  const rows = await parseEmployeeExcel(file)

  /** validasi NIP ganda */
  const duplicated = validateDuplicateNip(rows)
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
    nip: r.nip,
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

  /** replace = langsung preview */
  if (mode === "replace") {
    return { data: mapped }
  }

  /** update = compare dengan data existing */
  const compared = compareEmployees(mapped, existingEmployees)
  return { data: compared }
}
