import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType, AllowedResourceCsvSchema } from "App"
import { ZodSchema } from "zod"

export const adapters: Record<AllowedResourceType, (schema: AllowedResourceCsvSchema) => ImportCreate> = {
  skus: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "skus"),
  prices: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "prices"),
  coupons: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "coupons"),
}

const fromCsvSchemaToImportInputCreate = (parsedCsv: ZodSchema[], resourceType: AllowedResourceType): ImportCreate => {
  return {
    resource_type: resourceType,
    inputs: parsedCsv,
  }
}
