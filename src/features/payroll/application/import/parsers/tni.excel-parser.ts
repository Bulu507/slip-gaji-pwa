// features/payroll/application/import/parsers/tni.excel-parser.ts
import * as XLSX from "xlsx";
import type { RawPayrollRowTNI } from "./types";

export async function parseTNIExcel(file: File): Promise<RawPayrollRowTNI[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawRows = XLSX.utils.sheet_to_json<any>(sheet, {
    defval: null,
    raw: true,
  });

  if (rawRows.length === 0) {
    throw new Error("File Excel TNI kosong.");
  }

  return rawRows.map(normalizeTNIRow);
}

// ======================================================
// NORMALIZER (TNI)
// ======================================================

function normalizeTNIRow(row: any): RawPayrollRowTNI {
  const bulan = Number(row.bulan);
  const tahun = Number(row.tahun);

  if (!bulan || !tahun) {
    throw new Error("Kolom bulan/tahun tidak valid (TNI).");
  }

  const nogaji = String(row.nogaji ?? "").trim();
  const nip = String(row.nip ?? "").trim();
  const nmpeg = String(row.nmpeg ?? "").trim();

  if (!nogaji || !nip || !nmpeg) {
    throw new Error("Kolom wajib (nogaji/nip/nmpeg) kosong (TNI).");
  }

  return {
    // batch
    nogaji,
    bulan,
    tahun,

    // pegawai
    nip,
    nmpeg,

    // snapshot
    npwp: row.npwp ? String(row.npwp).trim() : undefined,
    nmrek: row.nmrek ? String(row.nmrek).trim() : undefined,
    nm_bank: row.nm_bank ? String(row.nm_bank).trim() : undefined,
    nmbankspan: row.nmbankspan ? String(row.nmbankspan).trim() : undefined,
    rekening: row.rekening ? String(row.rekening).trim() : undefined,

    // grade / gapok
    kdgol: row.kdgol ? String(row.kdgol) : undefined,
    kdgapok: row.kdgapok ? String(row.kdgapok) : undefined,
    kdkawin: row.kdkawin ? String(row.kdkawin) : undefined,

    // dates (keep raw string; business layer can ignore/use later)
    tmtjab: row.tmtjab ? String(row.tmtjab) : undefined,
    tmtkgb: row.tmtkgb ? String(row.tmtkgb) : undefined,
    tgllhr: row.tgllhr ? String(row.tgllhr) : undefined,

    // nominal inti
    bersih: Number(row.bersih) || 0,

    // spread semua kolom lain (komponen TNI: tlauk, tbrevet, tkhusus, dll)
    ...row,
  };
}
