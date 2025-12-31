import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import EmployeesPage from "@/features/employees/pages/EmployeesPage"
import EmployeeImportPage from "./features/employees/features/import/pages/EmployeeImportPage"
import SalariesPage from "./features/salaries/pages/SalariesPage"
import SalaryImportPage from "./features/salaries/features/import/pages/SalaryImportPage"
import SalaryDetailPage from "./features/salaries/features/detail/pages/SalaryDetailPage"
import TunkinPage from "./features/tunkin/pages/TunkinPage"
import TunkinImportPage from "./features/tunkin/features/import/pages/TunkinImportPage"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/employees", element: <EmployeesPage /> },
      { path: "/employees/import", element: <EmployeeImportPage /> },
      { path: "/salary", element: <SalariesPage /> },
      { path: "/salary/import", element: <SalaryImportPage /> },
      { path: "/salary/detail/:periodId", element: <SalaryDetailPage /> },
      { path: "/tunkin", element: <TunkinPage /> },
      { path: "/tunkin/import", element: <TunkinImportPage /> },
    ],
  },
])
