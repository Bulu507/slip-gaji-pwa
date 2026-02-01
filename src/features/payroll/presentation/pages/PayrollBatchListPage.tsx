// features/payroll/presentation/pages/PayrollBatchListPage.tsx
import { usePayrollBatches } from "../hooks/usePayrollBatches";
import { PayrollBatchTable } from "../components/PayrollBatchTable";
import { Link } from "react-router-dom";

export function PayrollBatchListPage() {
  const { data, loading, error } = usePayrollBatches();

  return (
    <div>
      <h1>Batch Payroll</h1>

      <div style={{ marginBottom: 16 }}>
        <Link to="/payroll/import">+ Import Payroll</Link>
      </div>

      {loading && <p>Memuat data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <PayrollBatchTable data={data} />}
    </div>
  );
}
