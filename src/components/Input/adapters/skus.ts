import { ImportCreate } from "@commercelayer/sdk"

import { CsvSkuItemSchema } from "#components/Input/schemas/skusSchema"

export const fromCsvSchemaToImportInputCreateSkus = (csvSkus: CsvSkuItemSchema[]): ImportCreate => {
  return {
    resource_type: "skus",
    inputs: csvSkus.map(({ ...input }) => ({
      ...input,
      // shipping_category: {
      //   type: "shipping_categories",
      //   id: shipping_category_id,
      // },
    })),
  }
}
