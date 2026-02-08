/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SalaryRaw } from "@/features/salaries/models/salary.model"
import * as XLSX from "xlsx"

const num = (v: any): number => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const str = (v: any): string => {
  return v == null ? "" : String(v).trim()
}

export async function parseSalaryExcel(
  file: File,
): Promise<SalaryRaw[]> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" })

  if (rows.length === 0) {
    throw new Error("File Excel kosong")
  }

  return rows.map((row): SalaryRaw => {
    // =====================
    // PERIODE
    // =====================
    const bulan = num(row.bulan)
    const tahun = num(row.tahun)

    // =====================
    // PENGHASILAN UMUM
    // =====================
    const gjpokok = num(row.gjpokok)
    const tjistri = num(row.tjistri)
    const tjanak = num(row.tjanak)
    const tjupns = num(row.tjupns)
    const tjstruk = num(row.tjstruk)
    const tjfungs = num(row.tjfungs)
    const tjdaerah = num(row.tjdaerah)
    const tjpencil = num(row.tjpencil)
    const tjlain = num(row.tjlain)
    const tjkompen = num(row.tjkompen)
    const tjberas = num(row.tjberas)
    const tjpph = num(row.tjpph)
    const pembul = num(row.pembul)

    // =====================
    // KHUSUS TNI
    // =====================
    const tkowan = num(row.tkowan)
    const tlauk = num(row.tlauk)
    const tpolwan = num(row.tpolwan)
    const tbabin = num(row.tbabin)
    const tsandi = num(row.tsandi)
    const tbrevet = num(row.tbrevet)
    const tkhusus = num(row.tkhusus)
    const tbatas = num(row.tbatas)

    // NEXT DEV
    const tunkin = 0

    const total_penghasilan =
      gjpokok +
      tjistri +
      tjanak +
      tjupns +
      tjstruk +
      tjfungs +
      tjdaerah +
      tjpencil +
      tjlain +
      tjkompen +
      tjberas +
      tjpph +
      tkowan +
      tlauk +
      tpolwan +
      tbabin +
      tsandi +
      tbrevet +
      tkhusus +
      tbatas +
      tunkin +
      pembul

    // =====================
    // POTONGAN
    // =====================
    const potpfkbul = num(row.potpfkbul)
    const potpfk2 = num(row.potpfk2)
    const potpfk10 = num(row.potpfk10)
    const potpph = num(row.potpph)
    const potswrum = num(row.potswrum)
    const potkelbtj = num(row.potkelbtj)
    const potlain = num(row.potlain)
    const pottabrum = num(row.pottabrum)

    // NEXT DEV
    const p_tht = 0
    const p_twp = 0
    const p_korpri = 0
    const p_bank1 = 0
    const p_bank2 = 0

    const total_potongan =
      potpfkbul +
      potpfk2 +
      potpfk10 +
      potpph +
      potswrum +
      potkelbtj +
      potlain +
      pottabrum +
      p_tht +
      p_twp +
      p_korpri +
      p_bank1 +
      p_bank2

    // =====================
    // HASIL
    // =====================
    const bersih =
      row.bersih !== ""
        ? num(row.bersih)
        : total_penghasilan - total_potongan

    return {
      // === PERIODE ===
      bulan,
      tahun,

      // === IDENTITAS ===
      nip: str(row.nip),
      nmpeg: str(row.nmpeg),
      nogaji: str(row.nogaji),

      // === KODE ADMIN ===
      kdsatker: str(row.kdsatker),
      kdanak: str(row.kdanak),
      kdsubanak: str(row.kdsubanak),
      kdjns: str(row.kdjns),
      kdduduk: str(row.kdduduk),
      kdgol: str(row.kdgol),
      kdjab: str(row.kdjab),
      kdkawin: str(row.kdkawin),
      thngj: str(row.thngj),
      kdgapok: str(row.kdgapok),
      sandi: str(row.sandi),

      // === BANK ===
      npwp: str(row.npwp),
      nmrek: str(row.nmrek),
      nm_bank: str(row.nm_bank),
      rekening: str(row.rekening),
      kdbankspan: str(row.kdbankspan),
      nmbankspan: str(row.nmbankspan),

      // === PENGHASILAN ===
      gjpokok,
      tjistri,
      tjanak,
      tjupns,
      tjstruk,
      tjfungs,
      tjdaerah,
      tjpencil,
      tjlain,
      tjkompen,
      tjberas,
      tjpph,
      pembul,

      // === TNI ===
      tkowan,
      tlauk,
      tpolwan,
      tbabin,
      tsandi,
      tbrevet,
      tkhusus,
      tbatas,

      // === POTONGAN ===
      potpfkbul,
      potpfk2,
      potpfk10,
      potpph,
      potswrum,
      potkelbtj,
      potlain,
      pottabrum,

      // === BPJS & TOTAL ===
      bpjs: num(row.bpjs),
      bpjs2: num(row.bpjs2),
      total_penghasilan,
      total_potongan,
      bersih,
    }
  })
}
