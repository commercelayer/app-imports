import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

import { csvCouponsSchema } from "./couponSchema"
import { csvPricesSchema } from "./pricesSchema"
import { csvSkusSchema } from "./skusSchema"

export const parsers: Record<AllowedResourceType, ZodSchema> = {
  skus: csvSkusSchema,
  prices: csvPricesSchema,
  coupons: csvCouponsSchema,
}
