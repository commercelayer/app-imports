import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

import { csvCouponsSchema } from "./coupon"
import { csvCustomersSchema } from "./customers"
import { csvCustomerSubscriptionsSchema } from "./customerSubscriptions"
import { csvGiftCardsSchema } from "./giftCards"
import { csvPricesSchema } from "./prices"
import { csvSkuListSchema } from "./skuLists"
import { csvSkusSchema } from "./skus"
import { csvTaxCategoriesSchema } from "./taxCategories"

export const parsers: Record<AllowedResourceType, ZodSchema> = {
  skus: csvSkusSchema,
  prices: csvPricesSchema,
  coupons: csvCouponsSchema,
  sku_lists: csvSkuListSchema,
  gift_cards: csvGiftCardsSchema,
  customers: csvCustomersSchema,
  customer_subscriptions: csvCustomerSubscriptionsSchema,
  tax_categories: csvTaxCategoriesSchema,
}
