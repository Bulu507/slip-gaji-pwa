import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import EmployeesPage from "@/features/employees/pages/EmployeesPage"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/employees", element: <EmployeesPage /> },
    ],
  },
])
