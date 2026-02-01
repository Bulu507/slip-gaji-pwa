export type RawPayrollRowPNS = {
  // batch context
  nogaji: string;
  bulan: number;
  tahun: number;

  // pegawai
  nip: string;
  nmpeg: string;

  // snapshot
  npwp?: string;
  nmrek?: string;
  nm_bank?: string;
  nmbankspan?: string;
  rekening?: string;

  kdgol?: string;
  kdkawin?: string;
  kdgapok?: string;

  // nominal
  bersih: number;

  // dynamic components
  [key: string]: any;
};

export type RawPayrollRowTNI = {
  // batch context
  nogaji: string;
  bulan: number;
  tahun: number;

  // pegawai
  nip: string;
  nmpeg: string;

  // snapshot
  npwp?: string;
  nmrek?: string;
  nm_bank?: string;
  nmbankspan?: string;
  rekening?: string;

  kdgol?: string;
  kdgapok?: string;
  kdkawin?: string;

  // nominal inti
  bersih: number;

  // TNI specific dates (optional, keep raw)
  tmtjab?: string;
  tmtkgb?: string;
  tgllhr?: string;

  // spread all numeric components
  [key: string]: any;
};

export type RawPayrollRowPPPK = {
  // batch context
  nogaji: string;
  bulan: number;
  tahun: number;

  // pegawai
  nip: string;
  nmpeg: string;

  // snapshot
  npwp?: string;
  nmrek?: string;
  nm_bank?: string;
  nmbankspan?: string;
  rekening?: string;

  // grade / gapok
  kdgol?: string;
  kdgapok?: string;
  kdkawin?: string;

  // nominal inti
  bersih: number;

  // spread komponen lain (tj, pot, dll)
  [key: string]: any;
};
