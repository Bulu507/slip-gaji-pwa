import { useEffect, useState } from "react"
import { getEmployeeProfile } from "@/core/payment-consolidation/query/get-employee-profile.service"
import type { EmployeeProfile } from "@/core/payment-consolidation/models/employee-profile.model"

export function useEmployeeProfile(employeeId: string) {

  const [employee, setEmployee] = useState<EmployeeProfile | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function load() {
      const data = await getEmployeeProfile(employeeId)
      setEmployee(data)
      setLoading(false)
    }

    load()

  }, [employeeId])

  return {
    employee,
    loading
  }

}