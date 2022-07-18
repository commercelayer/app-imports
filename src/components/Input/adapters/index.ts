import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType, AllowedResourceCsvSchema } from "App"

import { fromCsvSchemaToImportInputCreatePrices } from "#components/Input/adapters/prices"
import { fromCsvSchemaToImportInputCreateSkus } from "#components/Input/adapters/skus"

export const adapters: Record<AllowedResourceType, (schema: AllowedResourceCsvSchema) => ImportCreate> = {
  skus: fromCsvSchemaToImportInputCreateSkus,
  prices: fromCsvSchemaToImportInputCreatePrices,
}
