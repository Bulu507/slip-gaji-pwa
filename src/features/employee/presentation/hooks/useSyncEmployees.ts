import { useState } from "react"
import toast from "react-hot-toast"
import { syncEmployees } from "../../aplication/sync/sync-employee.service"

export function useSyncEmployees(onSuccess?: () => void) {

  const [loading, setLoading] = useState(false)

  async function runSync() {

    setLoading(true)

    try {

      await toast.promise(

        syncEmployees(),

        {
          loading: "Sinkronisasi data pegawai...",
          success: "Sinkronisasi pegawai berhasil",
          error: "Sinkronisasi pegawai gagal"
        }

      )

      onSuccess?.()

    } finally {

      setLoading(false)

    }

  }

  return {
    runSync,
    loading
  }

}