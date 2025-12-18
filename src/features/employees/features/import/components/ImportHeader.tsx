import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function ImportHeader() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between border-b pb-4">
      {/* Left: Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Employees", to: "/employees" },
          { label: "Import" },
        ]}
      />

      {/* Right: Close / Back */}
      <Button
        variant="destructive"
        onClick={() => navigate("/employees")}
        // className="text-muted-foreground hover:text-foreground"
      >
        Back
      </Button>
    </div>
  )
}
