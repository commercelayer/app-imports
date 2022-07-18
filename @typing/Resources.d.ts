import { csvPricesSchema } from "#components/Input/schemas/pricesSchema"
import { CsvSkuItemSchema } from "#components/Input/schemas/skusSchema"

declare module "App" {
  export type AllowedResourceType = "skus" | "prices"

  export type AllowedResourceCsvSchema = (CsvSkuItemSchema | csvPricesSchema)[]
}
