import { ImportCreate } from "@commercelayer/sdk"

import { CsvSkuItemSchema } from "#components/Input/schemas/skusSchema"

export const fromCsvSchemaToImportInputCreatePrices = (csvSkus: CsvSkuItemSchema[]): ImportCreate => {
  return {
    resource_type: "prices",
    inputs: csvSkus,
  }
}
