// features/payroll/application/import/payroll-import.error.ts
export class PayrollImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PayrollImportError";
  }
}
