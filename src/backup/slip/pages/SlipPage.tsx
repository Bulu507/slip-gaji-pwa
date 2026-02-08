import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

import { YEAR_OPTIONS } from "@/lib/constants/year-option.constant"
import { MONTH_OPTIONS } from "@/lib/constants/month-option.constant"

// ====== TYPES (sementara, nanti pindah ke model) ======
interface SlipRow {
  nip: string
  nama: string
  pangkat: string
}

// =====================================================

export default function SlipPage() {
  // ================= STATE =================
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")

  const [isLoaded, setIsLoaded] = useState(false)

  const [rows, setRows] = useState<SlipRow[]>([])
  const [selectedNips, setSelectedNips] = useState<string[]>([])

  // nanti dipakai untuk dialog error
  const [errorRows, setErrorRows] = useState<any[]>([])
  const [isErrorOpen, setIsErrorOpen] = useState(false)

  const period = year && month ? `${year}-${month}` : ""

  const canLoadData = Boolean(period)
  const canPrint = selectedNips.length > 0

  // ================= HANDLERS =================

  const handleLoadData = () => {
    if (!canLoadData) return

    /**
     * TODO:
     * 1. Ambil data gaji berdasarkan periode
     * 2. Cocokkan dengan master pegawai
     * 3. Valid:
     *    - setRows([...])
     * 4. Invalid (gaji ada, pegawai tidak ada):
     *    - setErrorRows([...])
     *    - setIsErrorOpen(true)
     */

    setIsLoaded(true)
  }

  const toggleSelect = (nip: string) => {
    setSelectedNips((prev) =>
      prev.includes(nip)
        ? prev.filter((n) => n !== nip)
        : [...prev, nip]
    )
  }

  const handleSelectAll = () => {
    setSelectedNips(rows.map((r) => r.nip))
  }

  const handleClearAll = () => {
    setSelectedNips([])
  }

  const handlePrintPdf = () => {
    /**
     * TODO:
     * Cetak PDF berdasarkan:
     * - period
     * - selectedNips
     */
  }

  const handleExportExcel = () => {
    /**
     * TODO:
     * Export Excel berdasarkan:
     * - period
     * - selectedNips
     */
  }

  // ================= RENDER =================
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/" },
          { label: "Slip Gaji" },
        ]}
      />

      <h1 className="text-xl font-semibold">Slip Gaji</h1>

      {/* ================= FILTER PERIODE ================= */}
      <Card className="p-4 space-y-4">
        <h2 className="font-medium">Periode Pendapatan</h2>

        <div className="grid grid-cols-2 gap-4">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OPTIONS.map((y) => (
                <SelectItem key={y.value} value={String(y.value)}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Bulan" />
            </SelectTrigger>
            <SelectContent>
              {MONTH_OPTIONS.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button disabled={!canLoadData} onClick={handleLoadData}>
            Tampilkan Data
          </Button>
        </div>
      </Card>

      {/* ================= TABEL DATA ================= */}
      {isLoaded && (
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Daftar Pegawai</h2>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                Pilih Semua
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Batalkan Semua
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Pangkat</TableHead>
                <TableHead className="text-center">Pilih</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm">
                    Tidak ada data gaji pada periode ini
                  </TableCell>
                </TableRow>
              )}

              {rows.map((row) => (
                <TableRow key={row.nip}>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.nip}</TableCell>
                  <TableCell>{row.pangkat}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedNips.includes(row.nip)}
                      onCheckedChange={() => toggleSelect(row.nip)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={!canPrint}
              onClick={handleExportExcel}
            >
              Export Excel
            </Button>

            <Button disabled={!canPrint} onClick={handlePrintPdf}>
              Cetak PDF
            </Button>
          </div>
        </Card>
      )}

      {/* ================= ERROR DIALOG ================= */}
      {/**
       * TODO:
       * Dialog error:
       * - tampil jika errorRows.length > 0
       * - bisa export Excel
       * - reuse pattern dari import gaji / pegawai
       */}
    </div>
  )
}
