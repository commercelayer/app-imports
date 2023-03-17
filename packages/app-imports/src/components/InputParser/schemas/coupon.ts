import { CouponCreate } from '@commercelayer/sdk'
import { z } from 'zod'
import { SetOptional } from 'type-fest'
import { zodEnforceInt, zodEnforceBoolean } from './zodUtils'

type FlatCsvRow = Omit<
  SetOptional<CouponCreate, 'usage_limit'>,
  'promotion_rule'
> & {
  promotion_rule_id?: string
}

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

export const csvCouponsSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)
