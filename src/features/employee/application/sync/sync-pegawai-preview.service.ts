import { GetEmployeeSyncSnapshotsService } from "@/features/payroll/application/query/get-employee-sync-snapshots.service";
import type { EmployeeSyncSnapshot } from "@/features/payroll/application/query/employee-sync.dto";
import { EmployeeRepository } from "../../data/repositories/employee.repository";
import type { Employee } from "../../domain/models/employee.model";
import type {
  EmployeePreviewNew,
  EmployeePreviewUpdate,
  SyncPegawaiPreviewResult,
} from "./sync-pegawai.types";

export class SyncPegawaiPreviewService {
  async execute(year: number): Promise<SyncPegawaiPreviewResult> {
    // 1️⃣ ambil snapshot dari payroll (DTO)
    const payrollQuery = new GetEmployeeSyncSnapshotsService();
    const snapshots: EmployeeSyncSnapshot[] = await payrollQuery.execute(year);

    // 2️⃣ repo employee tahun terpilih
    const employeeRepo = new EmployeeRepository(year);

    const newItems: EmployeePreviewNew[] = [];
    const updateItems: EmployeePreviewUpdate[] = [];

    for (const snap of snapshots) {
      const existing = await employeeRepo.findByNip(snap.nip);

      if (!existing) {
        // NEW
        const next: Employee = {
          id_pegawai: crypto.randomUUID(),
          nip: snap.nip,
          nama: snap.nama,
          tipe_pegawai: snap.tipePegawai,

          kd_gapok_terakhir: snap.kdGapok ?? null,
          grade_terakhir: snap.grade ?? null,
          kd_kawin: snap.kdKawin ?? null,

          last_seen_period: snap.lastSeenPeriod,
          last_sync_at: new Date().toISOString(),

          // additional (nullable)
          nik: null,
          npwp: null,
          unit: null,
          kd_bag: null,
          kd_subbag: null,
          jabatan: null,
          label_internal: null,

          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        newItems.push({ type: "NEW", nip: snap.nip, next });
        continue;
      }

      // UPDATE (compare field by field)
      const changedFields: (keyof Employee)[] = [];
      const after: Partial<Employee> = {};

      if (existing.nama !== snap.nama) {
        changedFields.push("nama");
        after.nama = snap.nama;
      }

      if (existing.kd_gapok_terakhir !== (snap.kdGapok ?? null)) {
        changedFields.push("kd_gapok_terakhir");
        after.kd_gapok_terakhir = snap.kdGapok ?? null;
      }

      if (existing.grade_terakhir !== (snap.grade ?? null)) {
        changedFields.push("grade_terakhir");
        after.grade_terakhir = snap.grade ?? null;
      }

      if (existing.kd_kawin !== (snap.kdKawin ?? null)) {
        changedFields.push("kd_kawin");
        after.kd_kawin = snap.kdKawin ?? null;
      }

      if (changedFields.length > 0) {
        after.last_seen_period = snap.lastSeenPeriod;
        after.last_sync_at = new Date().toISOString();
        after.updated_at = new Date().toISOString();

        updateItems.push({
          type: "UPDATE",
          nip: snap.nip,
          before: existing,
          after,
          changedFields,
        });
      }
    }

    return { year, newItems, updateItems };
  }
}
