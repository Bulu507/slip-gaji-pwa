export type PayrollComponent = {
  kode: string;    // kode asli Excel: gjpokok, tjistri, tlauk, potpph, dll
  nama: string;    // label manusiawi
  kelompok: "PENDAPATAN" | "POTONGAN";
  nilai: number;
};
