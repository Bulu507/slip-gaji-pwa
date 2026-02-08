import { useState } from "react";
import toast from "react-hot-toast";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant";
import type { SyncPegawaiPreviewResult } from "../../application/sync/sync-pegawai.types";
import { SyncPegawaiPreviewService } from "../../application/sync/sync-pegawai-preview.service";
import { SyncPegawaiCommitService } from "../../application/sync/sync-pegawai-commit.service";

export function EmployeeSyncPage() {
  const [year, setYear] = useState<number | null>(null);
  const [preview, setPreview] = useState<SyncPegawaiPreviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  async function handlePreview() {
    if (!year) return;

    try {
      setLoading(true);
      const service = new SyncPegawaiPreviewService();
      const result = await service.execute(year);
      setPreview(result);
    } catch (e: any) {
      toast.error(e?.message ?? "Gagal preview sinkronisasi pegawai");
    } finally {
      setLoading(false);
    }
  }

  async function handleCommit() {
    if (!preview) return;

    try {
      const service = new SyncPegawaiCommitService();
      await service.execute(preview);
      toast.success("Sinkronisasi pegawai berhasil");
      setPreview(null);
    } catch (e: any) {
      toast.error(e?.message ?? "Gagal melakukan sinkronisasi");
    }
  }

  const hasPreview =
    preview &&
    (preview.newItems.length > 0 || preview.updateItems.length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sinkronisasi Pegawai</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pilih Tahun */}
        <div className="flex items-end gap-3">
          <Select onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OPTIONS.map((y) => (
                <SelectItem key={y.value} value={String(y.value)}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handlePreview} disabled={!year || loading}>
            Preview Sinkronisasi
          </Button>
        </div>

        {/* Tidak ada perubahan */}
        {preview &&
          preview.newItems.length === 0 &&
          preview.updateItems.length === 0 && (
            <Alert>
              Tidak ada pegawai baru atau perubahan data untuk tahun ini.
            </Alert>
          )}

        {/* Preview Result */}
        {preview && (
          <Tabs defaultValue="new">
            <TabsList>
              <TabsTrigger value="new">
                Pegawai Baru ({preview.newItems.length})
              </TabsTrigger>
              <TabsTrigger value="update">
                Perubahan ({preview.updateItems.length})
              </TabsTrigger>
            </TabsList>

            {/* NEW */}
            <TabsContent value="new">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NIP</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Tipe Pegawai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.newItems.map((item) => (
                    <TableRow key={item.nip}>
                      <TableCell>{item.nip}</TableCell>
                      <TableCell>{item.next.nama}</TableCell>
                      <TableCell>{item.next.tipe_pegawai}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* UPDATE */}
            <TabsContent value="update">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NIP</TableHead>
                    <TableHead>Field Berubah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.updateItems.map((item) => (
                    <TableRow key={item.nip}>
                      <TableCell>{item.nip}</TableCell>
                      <TableCell>
                        {item.changedFields.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        )}

        {/* Action */}
        {hasPreview && (
          <div className="flex justify-end">
            <Button onClick={() => setOpenConfirm(true)}>
              Konfirmasi Sinkronisasi
            </Button>
          </div>
        )}
      </CardContent>

      {/* Alert Konfirmasi */}
      {preview && (
        <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Konfirmasi Sinkronisasi Pegawai
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan:
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>
                    Menambahkan {preview.newItems.length} pegawai baru
                  </li>
                  <li>
                    Mengupdate {preview.updateItems.length} pegawai
                  </li>
                  <li>
                    Berlaku untuk tahun <b>{preview.year}</b>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  Proses ini tidak dapat dibatalkan.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await handleCommit();
                  setOpenConfirm(false);
                }}
              >
                Ya, Sinkronkan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Card>
  );
}
