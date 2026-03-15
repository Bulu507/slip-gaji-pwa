import toast from "react-hot-toast"
import { exportEmployeeTemplate } from "../../aplication/export/export-employee-template.service"

export function useExportEmployeeTemplate() {

  async function runExport() {

    try {

      await toast.promise(

        exportEmployeeTemplate(),

        {
          loading: "Menyiapkan template pegawai...",
          success: "Template berhasil di download",
          error: "Export template gagal"
        }

      )

    } catch (err) {

      console.error(err)

    }

  }

  return {
    runExport
  }

}