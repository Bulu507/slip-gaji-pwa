import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// ===== PAYROLL (NEW – CLEAN ARCHITECTURE) =====
import { PayrollBatchListPage } from "@/features/payroll/presentation/pages/PayrollBatchListPage";
import { PayrollImportPage } from "@/features/payroll/presentation/pages/PayrollImportPage";
import { PayrollBatchDetailPage } from "@/features/payroll/presentation/pages/PayrollBatchDetailPage";
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
    ],
  },
]);
