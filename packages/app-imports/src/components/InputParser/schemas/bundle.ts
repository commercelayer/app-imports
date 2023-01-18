import { isFalsy } from '#utils/isFalsy'
import { BundleCreate } from '@commercelayer/sdk'
import { z, ZodType } from 'zod'
import { zodEnforceBoolean, zodEnforceInt } from './zodUtils'

type FlatCsvRow = Omit<BundleCreate, 'market' | 'sku_list'> & {
  market_id?: string
  sku_list_id?: string
}

const makeSchema = (hasParentResourceId: boolean): ZodType<FlatCsvRow> =>
  z
    .object({
      code: z.string(),
      name: z.string(),
      currency_code: z.optional(z.string().min(1)),
      description: z.optional(z.string().min(1)),
      image_url: z.optional(z.string().url()),
      do_not_ship: zodEnforceBoolean({ optional: true }),
      do_not_track: zodEnforceBoolean({ optional: true }),
      price_amount_cents: zodEnforceInt,
      compare_at_amount_cents: zodEnforceInt,
      _compute_price_amount: zodEnforceBoolean({ optional: true }),
      _compute_compare_at_amount: zodEnforceBoolean({ optional: true }),
      market_id: z.optional(z.string().min(1)),
      sku_list_id: z.optional(z.string())
    })
    .passthrough()
    .superRefine((data, ctx) => {
      if (isFalsy(data.market_id) && isFalsy(data.currency_code)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['currency_code'],
          message: 'currency_code is required if market_id is not set'
        })
      }
      if (!hasParentResourceId && isFalsy(data.sku_list_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['sku_list_id'],
          message: 'sku_list_id is required if parent resource is not set'
        })
      }
    })

export const csvBundleSchema = ({
  hasParentResource
}: {
  hasParentResource: boolean
}): z.ZodType<FlatCsvRow[]> => z.array(makeSchema(hasParentResource))
