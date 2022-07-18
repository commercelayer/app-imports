import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

import { csvPricesSchema } from "./pricesSchema"
import { csvSkusSchema } from "./skusSchema"

export const parsers: Record<AllowedResourceType, ZodSchema> = {
  skus: csvSkusSchema,
  prices: csvPricesSchema,
}
