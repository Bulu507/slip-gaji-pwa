// features/payroll/application/import/parsers/pns.excel-parser.ts
import * as XLSX from "xlsx";
import type { RawPayrollRowPNS } from "./types";

export async function parsePNSExcel(file: File): Promise<RawPayrollRowPNS[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // raw json (key = header excel)
  const rawRows = XLSX.utils.sheet_to_json<any>(sheet, {
    defval: null,
    raw: true,
  });

  if (rawRows.length === 0) {
    throw new Error("File Excel PNS kosong.");
  }

  return rawRows.map(normalizeRow);
}

// ======================================================
// NORMALIZER (PNS)
// ======================================================

function normalizeRow(row: any): RawPayrollRowPNS {
  const bulan = Number(row.bulan);
  const tahun = Number(row.tahun);

  if (!bulan || !tahun) {
    throw new Error("Kolom bulan/tahun tidak valid.");
  }

  return {
    // batch
    nogaji: String(row.nogaji).trim(),
    bulan,
    tahun,

    // pegawai
    nip: String(row.nip).trim(),
    nmpeg: String(row.nmpeg).trim(),

    // snapshot
    npwp: row.npwp ? String(row.npwp).trim() : undefined,
    nmrek: row.nmrek ? String(row.nmrek).trim() : undefined,
    nm_bank: row.nm_bank ? String(row.nm_bank).trim() : undefined,
    nmbankspan: row.nmbankspan ? String(row.nmbankspan).trim() : undefined,
    rekening: row.rekening ? String(row.rekening).trim() : undefined,

    kdgol: row.kdgol ? String(row.kdgol) : undefined,
    kdkawin: row.kdkawin ? String(row.kdkawin) : undefined,
    kdgapok: row.kdgapok ? String(row.kdgapok) : undefined,

    bersih: Number(row.bersih) || 0,

    // spread semua kolom lain
    ...row,
  };
}
