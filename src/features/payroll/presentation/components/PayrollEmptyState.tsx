import { Card, CardContent } from "@/components/ui/card";

type Props = { periode: string };

export function PayrollEmptyState({ periode }: Props) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-muted-foreground">
        <div className="font-medium">
          Tidak ada data payroll
        </div>
        <div className="text-sm mt-1">
          Periode <strong>{periode}</strong>
        </div>
        <div className="text-sm mt-2">
          Silakan ubah periode atau lakukan import payroll.
        </div>
      </CardContent>
    </Card>
  );
}
