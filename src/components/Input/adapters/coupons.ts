import { ImportCreate } from "@commercelayer/sdk"

import { CsvCouponItemSchema } from "#components/Input/schemas/couponSchema"

export const fromCsvSchemaToImportInputCreateCoupons = (csv: CsvCouponItemSchema[]): ImportCreate => {
  return {
    resource_type: "prices",
    inputs: csv,
  }
}
