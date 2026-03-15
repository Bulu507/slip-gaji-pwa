import { useEffect, useState } from "react"
import { getEmployeeProfiles } from "@/core/payment-consolidation/query/get-employee-profile.service"
import type { EmployeeProfile } from "@/core/payment-consolidation/models/employee-profile.model"

export function useEmployees() {

  const [employees, setEmployees] = useState<EmployeeProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function load() {
      const data = await getEmployeeProfiles()
      setEmployees(data)
      setLoading(false)
    }

    load()

  }, [])

  return {
    employees,
    loading
  }

}