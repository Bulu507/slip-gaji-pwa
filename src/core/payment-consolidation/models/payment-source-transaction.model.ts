export type PaymentSourceTransaction = {

  // universal employee id
  employeeId: string;

  // PNS / TNI / PPPK
  employeeType: string;

  // display name
  name: string;

  // periode pembayaran (YYYY-MM)
  periode: string;

  // asal sumber pembayaran
  source: string;

  // batch asal transaksi
  batchId: string;

  // total income dari source ini
  total: number;

  // snapshot data pegawai
  snapshot?: {
    rank?: string;
    position?: string;
    unit?: string;
  };

};