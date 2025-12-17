import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="h-14 flex items-center px-4 border-b font-semibold">
          Slip Gaji
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          <Button variant="ghost" className="w-full justify-start">Pegawai</Button>
          <Button variant="ghost" className="w-full justify-start">Import Gaji</Button>
          <Button variant="ghost" className="w-full justify-start">Import Tunkin</Button>
          <Button variant="ghost" className="w-full justify-start">Slip Gaji</Button>
          <Button variant="ghost" className="w-full justify-start">Backup & Restore</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="h-14 bg-background border-b flex items-center justify-between px-6">
          <span className="text-sm text-muted-foreground">Aplikasi Slip Gaji (Offline)</span>
          <Button size="sm">Export PDF</Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
