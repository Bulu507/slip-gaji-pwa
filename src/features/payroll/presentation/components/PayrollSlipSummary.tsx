// PayrollSlipSummary.tsx
type Props = {
  totalPendapatan: number;
  totalPotongan: number;
  gajiBersih: number;
};

export function PayrollSlipSummary({
  totalPendapatan,
  totalPotongan,
  gajiBersih,
}: Props) {
  return (
    <div>
      <p>Total Pendapatan: {totalPendapatan.toLocaleString("id-ID")}</p>
      <p>Total Potongan: {totalPotongan.toLocaleString("id-ID")}</p>
      <h3>Gaji Bersih: {gajiBersih.toLocaleString("id-ID")}</h3>
    </div>
  );
}
