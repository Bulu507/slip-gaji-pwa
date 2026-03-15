import { useEffect, useState } from "react"
import { getEmployeePayments } from "@/core/payment-consolidation/query/get-employee-payments.service"
import type { EmployeePayment } from "@/core/payment-consolidation/models/employee-payment.model"

export function useEmployeePayments(employeeId: string) {

  const [payments, setPayments] = useState<EmployeePayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function load() {
      const data = await getEmployeePayments(employeeId)
      setPayments(data)
      setLoading(false)
    }

    load()

  }, [employeeId])

  return {
    payments,
    loading
  }

}