import type { ImportMode, PreviewEmployee } from "../models/import.model"
import { parseExcelFile } from "./excel-parser.service"
import { compareEmployees } from "./employee-compare.service"
import { validateDuplicateNip } from "./employee-validation.service"
import type { Employee } from "@/features/employees/models/employee.model"

export async function importEmployeeFromExcel(
  file: File,
  mode: ImportMode,
  existingEmployees: Employee[]
): Promise<{
  data?: PreviewEmployee[]
  error?: {
    type: "DUPLICATE_NIP"
    duplicatedNips: string[]
  }
}> {
  // 1. Parse Excel
  const excelRows = await parseExcelFile(file)

  // 2. Validasi NIP ganda
  const duplicatedNips = validateDuplicateNip(excelRows)
  if (duplicatedNips.length > 0) {
    return {
      error: {
        type: "DUPLICATE_NIP",
        duplicatedNips,
      },
    }
  }

  // 3. Replace
  if (mode === "replace") {
    return {
      data: excelRows.map((row) => ({
        ...row,
        action: "new",
      })),
    }
  }

  // 4. Update
  return {
    data: compareEmployees(excelRows, existingEmployees),
  }
}
