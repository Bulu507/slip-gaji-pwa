// features/payroll/application/import/parsers/pppk.excel-parser.ts
import * as XLSX from "xlsx";
import type { RawPayrollRowPPPK } from "./types";

export async function parsePPPKExcel(
  file: File
): Promise<RawPayrollRowPPPK[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawRows = XLSX.utils.sheet_to_json<any>(sheet, {
    defval: null,
    raw: true,
  });

  if (rawRows.length === 0) {
    throw new Error("File Excel PPPK kosong.");
  }

  return rawRows.map(normalizePPPKRow);
}

// ======================================================
// NORMALIZER (PPPK)
// ======================================================

function normalizePPPKRow(row: any): RawPayrollRowPPPK {
  const bulan = Number(row.bulan);
  const tahun = Number(row.tahun);

  if (!bulan || !tahun) {
    throw new Error("Kolom bulan/tahun tidak valid (PPPK).");
  }

  const nogaji = String(row.nogaji ?? "").trim();
  const nip = String(row.nip ?? "").trim();
  const nmpeg = String(row.nmpeg ?? "").trim();

  if (!nogaji || !nip || !nmpeg) {
    throw new Error("Kolom wajib (nogaji/nip/nmpeg) kosong (PPPK).");
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

    // nominal inti
    bersih: Number(row.bersih) || 0,

    // spread semua kolom lain (tj, pot, dll)
    ...row,
  };
}
