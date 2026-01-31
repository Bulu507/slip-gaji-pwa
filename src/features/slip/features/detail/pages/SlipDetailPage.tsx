import { useMemo } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function SlipDetailPage() {
  const navigate = useNavigate()
  const { nip } = useParams<{ nip: string }>()
  const [searchParams] = useSearchParams()

  const period = searchParams.get("period")

  const isValid = useMemo(() => {
    return Boolean(nip && period)
  }, [nip, period])

  const handleBack = () => {
    navigate("/slip")
  }

  const handlePrint = () => {
    // TODO: implement PDF print
    console.log("Print slip:", { nip, period })
  }

  if (!isValid) {
    return (
      <div className="space-y-4">
        <Breadcrumb
          items={[
            { label: "Dashboard", to: "/" },
            { label: "Slip Gaji", to: "/slip" },
            { label: "Detail Slip" },
          ]}
        />

        <Card className="p-6 text-center text-muted-foreground">
          Data slip tidak valid. Periksa NIP dan periode.
        </Card>

        <Button variant="outline" onClick={handleBack}>
          Kembali
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/" },
          { label: "Slip Gaji", to: "/slip" },
          { label: "Detail Slip" },
        ]}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Slip Gaji</h1>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBack}>
            Kembali
          </Button>
          <Button onClick={handlePrint}>
            Cetak Slip
          </Button>
        </div>
      </div>

      {/* Identitas Pegawai & Periode */}
      <Card className="p-4 space-y-2">
        <div className="text-sm text-muted-foreground">NIP</div>
        <div className="font-medium">{nip}</div>

        <div className="text-sm text-muted-foreground mt-2">Periode</div>
        <div className="font-medium">{period}</div>
      </Card>

      {/* Pendapatan */}
      <Card className="p-4">
        <h2 className="font-medium mb-2">Pendapatan</h2>
        {/* TODO: <SlipIncomeTable /> */}
        <div className="text-sm text-muted-foreground">
          (Data pendapatan akan ditampilkan di sini)
        </div>
      </Card>

      {/* Potongan */}
      <Card className="p-4">
        <h2 className="font-medium mb-2">Potongan</h2>
        {/* TODO: <SlipDeductionTable /> */}
        <div className="text-sm text-muted-foreground">
          (Data potongan akan ditampilkan di sini)
        </div>
      </Card>

      {/* Ringkasan */}
      <Card className="p-4">
        <h2 className="font-medium mb-2">Ringkasan</h2>
        {/* TODO: <SlipSummary /> */}
        <div className="text-sm text-muted-foreground">
          (Total gaji bersih)
        </div>
      </Card>
    </div>
  )
}
