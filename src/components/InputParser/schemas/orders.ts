import { isFalsy } from '#utils/isFalsy'
import { OrderCreate } from '@commercelayer/sdk'
import { z, ZodType } from 'zod'
import { zodEnforceBoolean } from './zodUtils'

type FlatCsvRow = Omit<
  OrderCreate,
  | 'shipping_address'
  | 'billing_address'
  | 'payment_method'
  | 'payment_source'
  | 'market'
  | 'customer'
> & {
  market_id?: string
}

const makeSchema = (hasParentResourceId: boolean): ZodType<FlatCsvRow> =>
  z
    .object({
      autorefresh: zodEnforceBoolean(true),
      guest: zodEnforceBoolean(true),
      customer_email: z.optional(z.string().email()),
      customer_password: z.optional(z.string().min(1)),
      language_code: z.optional(z.string().min(1).max(2)),
      shipping_country_code_lock: z.optional(z.string().min(1)),
      coupon_code: z.optional(z.string().min(1)),
      gift_card_code: z.optional(z.string().min(1)),
      gift_card_or_coupon_code: z.optional(z.string().min(1)),
      cart_url: z.optional(z.string().min(1)),
      return_url: z.optional(z.string().min(1)),
      terms_url: z.optional(z.string().min(1)),
      privacy_url: z.optional(z.string().min(1)),
      market_id: z.optional(z.string())
    })
    .passthrough()
    .superRefine((data, ctx) => {
      if (!hasParentResourceId && isFalsy(data.market_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['market_id'],
          message: 'market_id is required if parent resource is not set'
        })
      }
    })

export const csvOrdersSchema = ({
  hasParentResource
}: {
  hasParentResource: boolean
}): z.ZodType<FlatCsvRow[]> => z.array(makeSchema(hasParentResource))
