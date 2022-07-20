import { PriceCreate } from "@commercelayer/sdk"
import { z } from "zod"

import { zodEnforceInt } from "./zodUtils"

type FlatCreatePriceItem = Pick<
  PriceCreate,
  "sku_code" | "amount_cents" | "compare_at_amount_cents" | "reference" | "reference_origin"
> & {
  price_list_id: string
}

export type CsvPriceItemSchema = z.infer<typeof schema>

const schema = z.object({
  amount_cents: zodEnforceInt,
  compare_at_amount_cents: zodEnforceInt,
  price_list_id: z.string().min(1),
  sku_code: z.optional(z.string()),
  reference: z.optional(z.string()),
  reference_origin: z.optional(z.string()),
})

export const csvPricesSchema: z.ZodType<FlatCreatePriceItem[]> = z.array(schema)
