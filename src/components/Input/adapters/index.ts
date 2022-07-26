import { ImportCreate } from "@commercelayer/sdk"
import { AllowedResourceType } from "App"
import { ZodSchema } from "zod"

type AdapterOptions = {
  parentResourceId?: string
  cleanup?: boolean
}

export const adapters: Record<AllowedResourceType, (schema: ZodSchema[], options: AdapterOptions) => ImportCreate> = {
  skus: (...args) => fromCsvSchemaToImportInputCreate(...args, "skus"),
  sku_lists: (...args) => fromCsvSchemaToImportInputCreate(...args, "sku_lists"),
  prices: (...args) => fromCsvSchemaToImportInputCreate(...args, "prices"),
  coupons: (...args) => fromCsvSchemaToImportInputCreate(...args, "coupons"),
  gift_cards: (...args) => fromCsvSchemaToImportInputCreate(...args, "gift_cards"),
  customers: (...args) => fromCsvSchemaToImportInputCreate(...args, "customers"),
  customer_subscriptions: (...args) => fromCsvSchemaToImportInputCreate(...args, "customer_subscriptions"),
  tax_categories: (...args) => fromCsvSchemaToImportInputCreate(...args, "tax_categories"),
  stock_items: (...args) => fromCsvSchemaToImportInputCreate(...args, "stock_items"),
}

const fromCsvSchemaToImportInputCreate = (
  parsedCsv: ZodSchema[],
  options: AdapterOptions,
  resourceType: AllowedResourceType
): ImportCreate => {
  return {
    resource_type: resourceType,
    parent_resource_id: options.parentResourceId,
    cleanup_records: options.cleanup,
    inputs: parsedCsv,
  }
}
