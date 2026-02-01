import { NavLink, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SidebarItemProps = {
  to: string
  label: string
  end?: boolean
}

function SidebarItem({ to, label, end = false }: SidebarItemProps) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            isActive &&
              "bg-accent text-accent-foreground font-medium border-l-4 border-primary pl-3"
          )}
        >
          {label}
        </Button>
      )}
    </NavLink>
  )
}


export default function AppLayout() {
  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-4 space-y-2">
        <h2 className="mb-4 text-lg font-semibold">Payroll App</h2>

        <SidebarItem to="/" label="Dashboard" end />
        <SidebarItem to="/employees" label="Pegawai" />
        <SidebarItem to="/payroll" label="Gaji" />
        <SidebarItem to="/tunkin" label="Tunkin" />
        <SidebarItem to="/slip" label="Slip Gaji" />
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
