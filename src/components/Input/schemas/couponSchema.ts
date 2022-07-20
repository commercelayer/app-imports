import { CouponCreate } from "@commercelayer/sdk"
import { z } from "zod"

import { zodEnforceInt, zodEnforceBoolean } from "./zodUtils"

type FlatCreateCouponItem = Pick<
  CouponCreate,
  "code" | "customer_single_use" | "usage_limit" | "recipient_email" | "reference" | "reference_origin"
> & {
  promotion_rule_id: string
}

export type CsvCouponItemSchema = z.infer<typeof schema>

const schema = z.object({
  code: z.string().min(8),
  promotion_rule_id: z.string(),
  usage_limit: zodEnforceInt,
  customer_single_use: zodEnforceBoolean(true),
  recipient_email: z.optional(z.string()),
  reference: z.optional(z.string()),
  reference_origin: z.optional(z.string()),
})

export const csvCouponsSchema: z.ZodType<FlatCreateCouponItem[]> = z.array(schema)
