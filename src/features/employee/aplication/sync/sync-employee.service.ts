import { rebuildConsolidation } from "@/core/payment-consolidation/engine/rebuild-consolidation.engine";

export async function syncEmployees(): Promise<void> {

  console.log("Running employee sync...");

  await rebuildConsolidation();

  console.log("Employee sync completed");

}