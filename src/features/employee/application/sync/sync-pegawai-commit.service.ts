// features/employees/application/sync/sync-pegawai-commit.service.ts

import { EmployeeRepository } from "../../data/repositories/employee.repository";
import type { SyncPegawaiPreviewResult } from "./sync-pegawai.types";


/**
 * Service untuk MENG-COMMIT hasil preview sinkronisasi Pegawai.
 *
 * - WRITE ONLY ke EmployeeRepository
 * - Tidak melakukan perhitungan ulang
 * - Tidak memanggil Payroll
 */
export class SyncPegawaiCommitService {
  async execute(preview: SyncPegawaiPreviewResult): Promise<void> {
    const { year, newItems, updateItems } = preview;

    const employeeRepo = new EmployeeRepository(year);

    // 1️⃣ INSERT pegawai baru
    for (const item of newItems) {
      await employeeRepo.insert(item.next);
    }

    // 2️⃣ UPDATE pegawai existing
    for (const item of updateItems) {
      const updated = {
        ...item.before,
        ...item.after,
      };

      await employeeRepo.update(updated);
    }
  }
}
