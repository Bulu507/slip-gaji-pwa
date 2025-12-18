import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import EmployeesPage from "@/features/employees/pages/EmployeesPage"
import EmployeeImportPage from "./features/employees/pages/EmployeesImportPage"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/employees", element: <EmployeesPage /> },
      { path: "/employees/import", element: <EmployeeImportPage /> },
    ],
  },
])
