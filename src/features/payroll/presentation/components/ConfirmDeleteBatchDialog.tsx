import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  onConfirm: () => Promise<void>;
  loading?: boolean;
};

export function ConfirmDeleteBatchDialog({
  onConfirm,
  loading,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={loading}>
          Hapus Batch Payroll
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus Batch Payroll?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan menghapus <b>seluruh batch payroll</b>{" "}
            beserta <b>seluruh transaksi pegawai</b> di dalamnya.
            <br />
            <br />
            Tindakan ini <b>tidak dapat dibatalkan</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Menghapus…" : "Ya, Hapus Batch"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
