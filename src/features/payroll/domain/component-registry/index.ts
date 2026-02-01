// index.ts
import { PNS_COMPONENTS } from "./pns.components";
import { TNI_COMPONENTS } from "./tni.components";
import { PPPK_COMPONENTS } from "./pppk.components";
import type { EmployeeType } from "@/lib/constants/employee-type.constant";
import type { PayrollComponentDef } from "./types";

export const PAYROLL_COMPONENT_REGISTRY: Record<EmployeeType, PayrollComponentDef[]> = {
  PNS: PNS_COMPONENTS,
  TNI: TNI_COMPONENTS,
  PPPK: PPPK_COMPONENTS,
  NON_ASN: [],
};
