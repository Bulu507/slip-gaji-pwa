type Props = {
  periode: string;
};

export function PayrollEmptyState({ periode }: Props) {
  return (
    <div className="border rounded-md p-8 text-center text-gray-600">
      <p className="font-medium">
        Tidak ada data payroll untuk periode <strong>{periode}</strong>
      </p>
      <p className="mt-2 text-sm">
        Silakan ubah periode atau lakukan import payroll.
      </p>
    </div>
  );
}
