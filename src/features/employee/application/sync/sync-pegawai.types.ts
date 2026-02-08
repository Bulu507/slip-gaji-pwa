import type { Employee } from "../../domain/models/employee.model";

export type EmployeePreviewNew = {
  type: "NEW";
  nip: string;
  next: Employee;
};

export type EmployeePreviewUpdate = {
  type: "UPDATE";
  nip: string;
  before: Employee;
  after: Partial<Employee>;
  changedFields: (keyof Employee)[];
};

export type SyncPegawaiPreviewResult = {
  year: number;
  newItems: EmployeePreviewNew[];
  updateItems: EmployeePreviewUpdate[];
};
