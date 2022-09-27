import { AllowedResourceType } from 'App'
import { ZodSchema } from 'zod'
import { csvAddressSchema } from './address'
import { csvBundleSchema } from './bundle'
import { csvCouponsSchema } from './coupon'
import { csvCustomersSchema } from './customers'
import { csvCustomerSubscriptionsSchema } from './customerSubscriptions'
import { csvGiftCardsSchema } from './giftCards'
import { csvOrdersSchema } from './orders'
import { csvPricesSchema } from './prices'
import { csvShippingCategorySchema } from './shippingCategory'
import { csvSkuListSchema } from './skuLists'
import { csvSkuOptionSchema } from './skuOptions'
import { csvSkusSchema } from './skus'
import { csvStockItemsSchema } from './stockItems'
import { csvTaxCategoriesSchema } from './taxCategories'

type MakeSchemaFn = ({
  hasParentResource
}: {
  hasParentResource: boolean
}) => ZodSchema
type SchemaOrMakeSchemaFn = ZodSchema | MakeSchemaFn

export const isMakeSchemaFn = (parser: any): parser is MakeSchemaFn => {
  return typeof parser.safeParse === 'undefined'
}

export const parsers: Record<AllowedResourceType, SchemaOrMakeSchemaFn> = {
  addresses: csvAddressSchema,
  bundles: csvBundleSchema,
  skus: csvSkusSchema,
  prices: csvPricesSchema,
  coupons: csvCouponsSchema,
  sku_lists: csvSkuListSchema,
  sku_options: csvSkuOptionSchema,
  gift_cards: csvGiftCardsSchema,
  customers: csvCustomersSchema,
  customer_subscriptions: csvCustomerSubscriptionsSchema,
  tax_categories: csvTaxCategoriesSchema,
  stock_items: csvStockItemsSchema,
  shipping_categories: csvShippingCategorySchema,
  orders: csvOrdersSchema
}
