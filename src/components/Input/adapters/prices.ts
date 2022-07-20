import { ImportCreate } from "@commercelayer/sdk"

import { CsvPriceItemSchema } from "#components/Input/schemas/pricesSchema"

export const fromCsvSchemaToImportInputCreatePrices = (csv: CsvPriceItemSchema[]): ImportCreate => {
  return {
    resource_type: "prices",
    inputs: csv,
  }
}
