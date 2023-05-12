import { type PriceCreate } from '@commercelayer/sdk'
import { z } from 'zod'

import { zodEnforceInt } from './zodUtils'
import { isFalsy } from '#utils/isFalsy'
import { type SetOptional } from 'type-fest'

type FlatCsvRow = Omit<
  SetOptional<PriceCreate, 'compare_at_amount_cents'>,
  'price_tiers' | 'sku' | 'price_list'
> & {
  price_list_id?: string
  'price_tiers.type'?: 'PriceVolumeTier'
  'price_tiers.name'?: string
  'price_tiers.up_to'?: number
  'price_tiers.price_amount_cents'?: number
}

const makeSchema = (hasParentResourceId: boolean): z.ZodType<FlatCsvRow> =>
  z
    .object({
      amount_cents: zodEnforceInt,
      compare_at_amount_cents: z.optional(zodEnforceInt),
      price_list_id: z.optional(z.string().min(1)),
      sku_code: z.optional(z.string()),
      reference: z.optional(z.string()),
      reference_origin: z.optional(z.string()),
      // price_tiers relationship
      'price_tiers.type': z.optional(z.literal('PriceVolumeTier')),
      'price_tiers.name': z.optional(z.string().min(1)),
      'price_tiers.up_to': z.optional(zodEnforceInt),
      'price_tiers.price_amount_cents': z.optional(zodEnforceInt)
    })
    .passthrough()
    .superRefine((data, ctx) => {
      if (!hasParentResourceId && isFalsy(data.price_list_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price_list_id'],
          message: 'price_list_id is required if parent resource is not set'
        })
      }

      if (
        !isFalsy(data['price_tiers.type']) &&
        isFalsy(data['price_tiers.name'])
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price_tiers.name'],
          message: 'price_tiers.name is required if price_tiers is set'
        })
      }

      if (
        !isFalsy(data['price_tiers.type']) &&
        isFalsy(data['price_tiers.price_amount_cents'])
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['price_tiers.price_amount_cents'],
          message:
            'price_tiers.price_amount_cents is required if price_tiers is set'
        })
      }
    })

export const csvPricesSchema = ({
  hasParentResource
}: {
  hasParentResource: boolean
}): z.ZodType<FlatCsvRow[]> => z.array(makeSchema(hasParentResource))
