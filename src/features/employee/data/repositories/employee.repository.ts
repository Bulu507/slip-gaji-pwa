import type { Employee } from "../../domain/models/employee.model";
import { openEmployeeDB } from "../db/employee-db";

export class EmployeeRepository {
  private readonly year: number;

  constructor(year: number) {
    this.year = year;
  }

  private async db() {
    return openEmployeeDB(this.year);
  }

  async getAll(): Promise<Employee[]> {
    const db = await this.db();
    return db.getAll("employees");
  }

  async findByNip(nip: string): Promise<Employee | undefined> {
    const db = await this.db();
    return db.getFromIndex("employees", "by-nip", nip);
  }

  async insert(employee: Employee): Promise<void> {
    const db = await this.db();
    await db.add("employees", employee);
  }

  async update(employee: Employee): Promise<void> {
    const db = await this.db();
    await db.put("employees", employee);
  }

  async upsert(employee: Employee): Promise<void> {
    const db = await this.db();
    await db.put("employees", employee);
  }

  async clear(): Promise<void> {
    const db = await this.db();
    await db.clear("employees");
  }
}
