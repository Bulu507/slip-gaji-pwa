import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"

import { getEmployeeByNip } from "@/features/employees/services/employee-storage.service"

export default function EmployeeDetailPage() {
  const navigate = useNavigate()
  const { nip } = useParams<{ nip: string }>()

  const employee = getEmployeeByNip(nip!);

  if (!employee) {
    return (
      <div className="space-y-4">
        <Breadcrumb
          items={[
            { label: "Pegawai", to: "/employees" },
            { label: "Detail Pegawai" },
          ]}
        />

        <p className="text-sm text-destructive">
          Data pegawai tidak ditemukan
        </p>

        <Button variant="destructive" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Breadcrumb
            items={[
              { label: "Pegawai", to: "/employees" },
              { label: "Detail Pegawai" },
            ]}
          />
          <h1 className="text-2xl font-semibold">
            {employee.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            NIP: {employee.nip}
          </p>
        </div>

        <Button variant="destructive" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {/* INFORMASI UTAMA */}
      <Card className="p-4 space-y-4">
        <h2 className="font-semibold">Informasi Kepegawaian</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Golongan" value={employee.grade} />
          <Info label="Nama Golongan" value={employee.gradeName} />
          <Info label="Jabatan" value={employee.jobTitle} />
          <Info label="Posisi" value={employee.position} />
          <Info label="Unit" value={employee.unit} />
          <Info label="Tipe Pegawai" value={employee.employmentType} />
          <Info label="Kode Gaji Pokok" value={employee.baseSalaryCode} />
          <Info
            label="Status Kawin"
            value={employee.maritalStatusCode}
          />
        </div>
      </Card>
    </div>
  )
}

/**
 * Small helper component
 */
function Info({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  )
}
