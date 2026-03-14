export type EmployeeIndex = {

  employeeId: string;

  employeeType: string;

  name: string;

  rank?: string;

  position?: string;

  unit?: string;

  // sumber pendapatan pegawai
  sources: string[];

  // audit
  lastUpdated: string;

};