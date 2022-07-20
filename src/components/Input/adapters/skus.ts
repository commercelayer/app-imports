import { ImportCreate } from "@commercelayer/sdk"

import { CsvSkuItemSchema } from "#components/Input/schemas/skusSchema"

export const fromCsvSchemaToImportInputCreateSkus = (csv: CsvSkuItemSchema[]): ImportCreate => {
  return {
    resource_type: "skus",
    inputs: csv.map(({ ...input }) => ({
      ...input,
    })),
  }
}
