import { Input } from "@/components/ui/input";

export function ImportUploader({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void;
}) {
  return (
    <div className="border bg-background rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-lg">Upload Excel Pegawai</h3>

      <Input
        type="file"
        accept=".xlsx,.xls"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />
    </div>
  );
}
