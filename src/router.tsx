import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// Employees (tetap)
import EmployeesPage from "@/features/employees/pages/EmployeesPage";
import EmployeeImportPage from "@/features/employees/features/import/pages/EmployeeImportPage";
import EmployeeDetailPage from "@/features/employees/features/detail/pages/EmployeeDetailPage";

// ===== PAYROLL (NEW – CLEAN ARCHITECTURE) =====
import { PayrollBatchListPage } from "@/features/payroll/presentation/pages/PayrollBatchListPage";
import { PayrollImportPage } from "@/features/payroll/presentation/pages/PayrollImportPage";
import { PayrollBatchDetailPage } from "@/features/payroll/presentation/pages/PayrollBatchDetailPage";

// Legacy Salary (JANGAN DIHAPUS)
import SalariesPage from "@/features/salaries/pages/SalariesPage";
import SalaryImportPage from "@/features/salaries/features/import/pages/SalaryImportPage";
import SalaryDetailPage from "@/features/salaries/features/detail/pages/SalaryDetailPage";

// Tunkin (tetap)
import TunkinPage from "@/features/tunkin/pages/TunkinPage";
import TunkinImportPage from "@/features/tunkin/features/import/pages/TunkinImportPage";
import TunkinDetailPage from "@/features/tunkin/features/detail/pages/TunkinDetailPage";

// Legacy Slip (akan dipensiunkan)
import SlipPage from "@/features/slip/pages/SlipPage";
import SlipDetailPage from "@/features/slip/features/detail/pages/SlipDetailPage";
import { PayrollSlipPage } from "./features/payroll/presentation/pages/PayrollSlipPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },

      // ===== PAYROLL (NEW) =====
      { path: "/payroll", element: <PayrollBatchListPage /> },
      { path: "/payroll/import", element: <PayrollImportPage /> },
      { path: "/payroll/batch/:batchId", element: <PayrollBatchDetailPage /> },
      { path: "/payroll/batch/:batchId/:nip", element: <PayrollSlipPage /> },

      // ===== EMPLOYEES (SUPPORT) =====
      { path: "/employees", element: <EmployeesPage /> },
      { path: "/employees/import", element: <EmployeeImportPage /> },
      { path: "/employees/:nip", element: <EmployeeDetailPage /> },

      // ===== TUNKIN (SEPARATE DOMAIN) =====
      { path: "/tunkin", element: <TunkinPage /> },
      { path: "/tunkin/import", element: <TunkinImportPage /> },
      { path: "/tunkin/:periodId", element: <TunkinDetailPage /> },

      // ===== LEGACY (FREEZE) =====
      { path: "/salary", element: <SalariesPage /> },
      { path: "/salary/import", element: <SalaryImportPage /> },
      { path: "/salary/:periodId", element: <SalaryDetailPage /> },

      { path: "/slip", element: <SlipPage /> },
      { path: "/slip/:nip", element: <SlipDetailPage /> },
    ],
  },
]);
