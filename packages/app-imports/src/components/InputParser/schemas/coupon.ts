import { z } from 'zod'
import { zodEnforceBoolean, zodEnforceInt } from './zodUtils'

const schema = z
  .object({
    code: z.string().min(8),
    promotion_rule_id: z.optional(z.string().min(1)),
    usage_limit: z.optional(zodEnforceInt),
    customer_single_use: zodEnforceBoolean({ optional: true }),
    recipient_email: z.optional(z.string()),
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string())
  })
  .passthrough()

export const csvCouponsSchema = z.array(schema)
