export function getCurrentPeriode(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${year}-${month}`;
}

export function isValidPeriode(periode: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(periode);
}

export function toPeriode(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function fromPeriode(periode: string) {
  const [year, month] = periode.split("-").map(Number);
  return { year, month };
}
