import { getEmployees } from "./get-employees.service"
import { getAllEmployeeEnrichment } from "../repositories/employee-enrichment.repository"

import type { EmployeeProfile } from "../models/employee-profile.model"

export async function getEmployeeProfiles(): Promise<EmployeeProfile[]> {

  const employees = await getEmployees()

  const enrichments = await getAllEmployeeEnrichment()

  const enrichmentMap = new Map(
    enrichments.map(e => [e.employeeId, e])
  )

  return employees.map(emp => {

    const enrichment = enrichmentMap.get(emp.employeeId)

    return {

      employeeId: emp.employeeId,

      name: emp.name,

      employeeType: emp.employeeType,

      rank: emp.rank,

      position: enrichment?.position ?? emp.position,

      unit: enrichment?.unit ?? emp.unit,

      nik: enrichment?.nik,

      npwp: enrichment?.npwpOverride,

      address: enrichment?.address,

      notes: enrichment?.notes,

      sources: emp.sources

    }

  })

}

export async function getEmployeeProfile(
  employeeId: string
): Promise<EmployeeProfile | undefined> {

  const profiles = await getEmployeeProfiles()

  return profiles.find(p => p.employeeId === employeeId)

}