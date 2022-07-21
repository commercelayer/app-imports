import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

export const adapters: Record<AllowedResourceType, (schema: ZodSchema[]) => ImportCreate> = {
  skus: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "skus"),
  sku_lists: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "sku_lists"),
  prices: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "prices"),
  coupons: (parsedCsv: ZodSchema[]) => fromCsvSchemaToImportInputCreate(parsedCsv, "coupons"),
}

const fromCsvSchemaToImportInputCreate = (parsedCsv: ZodSchema[], resourceType: AllowedResourceType): ImportCreate => {
  return {
    resource_type: resourceType,
    inputs: parsedCsv,
  }
}
