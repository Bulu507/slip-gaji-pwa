import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import { PayrollBatchRepository } from "../../data/repositories/payroll-batch.repository";

type Input = {
  periodeBayar: string;
  tipePegawai?: EmployeeType;
};

export class GetPayrollBatchesByPeriodeService {
  private readonly repo: PayrollBatchRepository;

  constructor(repo?: PayrollBatchRepository) {
    this.repo = repo ?? new PayrollBatchRepository();
  }

  async execute(input: Input) {
    return this.repo.findByPeriodeAndTipe(
      input.periodeBayar,
      input.tipePegawai,
    );
  }
}
