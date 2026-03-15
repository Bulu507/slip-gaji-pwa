import { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeTable } from "../components/EmployeeTable";
import { EmployeeFilterBar } from "../components/EmployeeFilterBar";
import { Button } from "@/components/ui/button";
import { useSyncEmployees } from "../hooks/useSyncEmployees";
import { useExportEmployeeTemplate } from "../hooks/useExportEmployeeTemplate";

export function EmployeeListPage() {
  const { employees, loading } = useEmployees();
  const { runSync, loading: syncing } = useSyncEmployees();
  const { runExport } = useExportEmployeeTemplate();

  const [search, setSearch] = useState("");

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();

    return (
      e.employeeId.toLowerCase().includes(q) || e.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Data Pegawai</div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={runExport}>
            Export Template
          </Button>

          <Button variant="outline">Import Excel</Button>

          <Button onClick={runSync} disabled={syncing}>
            {syncing ? "Syncing..." : "Sync Pegawai"}
          </Button>
        </div>
      </div>

      {/* FILTER */}

      <EmployeeFilterBar search={search} onSearchChange={setSearch} />

      {/* TABLE */}

      <EmployeeTable employees={filtered} loading={loading} />
    </div>
  );
}
