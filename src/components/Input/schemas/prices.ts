import { PriceCreate } from '@commercelayer/sdk'
import { z, ZodTypeAny } from 'zod'

import { zodEnforceInt } from './zodUtils'
import { isFalsy } from '#utils/isFalsy'

type FlatCsvRow = PriceCreate & {
  price_list_id?: string
}

const makeSchema = (hasParentResourceId: boolean): ZodTypeAny =>
  z
    .object({
      amount_cents: zodEnforceInt,
      compare_at_amount_cents: zodEnforceInt,
      price_list_id: z.optional(z.string().min(1)),
      sku_code: z.optional(z.string()),
      reference: z.optional(z.string()),
      reference_origin: z.optional(z.string())
    })
    .superRefine((data, ctx) => {
      if (!hasParentResourceId && isFalsy(data.price_list_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price_list_id'],
          message: 'price_list_id is required if parent resource is not set'
        })
      }
    })

export const csvPricesSchema = ({
  hasParentResource
}: {
  hasParentResource: boolean
}): z.ZodType<FlatCsvRow[]> => z.array(makeSchema(hasParentResource))
