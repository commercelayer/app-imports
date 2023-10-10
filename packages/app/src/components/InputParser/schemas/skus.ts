import { isFalsy } from '#utils/isFalsy'
import { z } from 'zod'

import {
  zodEnforcePositiveInt,
  zodEnforceBoolean,
  zodEnforcePositiveFloat,
  zodCaseInsensitiveNativeEnum
} from './zodUtils'

enum AllowedUnitOfWeightEnum {
  'grams' = 'gr',
  'libra' = 'lb',
  'ounce' = 'oz'
}

const createSchema = z
  .object({
    code: z.string().min(1),
    name: z.string().min(1),
    shipping_category_id: z.optional(z.string().min(1)),
    description: z.optional(z.string()),
    image_url: z.optional(z.string().url()),
    pieces_per_pack: z.optional(zodEnforcePositiveInt),
    weight: z.optional(zodEnforcePositiveFloat),
    unit_of_weight: z.optional(
      zodCaseInsensitiveNativeEnum(AllowedUnitOfWeightEnum)
    ),
    hs_tariff_number: z.optional(z.string()),
    do_not_ship: zodEnforceBoolean({ optional: true }),
    do_not_track: zodEnforceBoolean({ optional: true }),
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string())
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if (data.shipping_category_id == null && isFalsy(data.do_not_ship)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['shipping_category_id'],
        message: 'shipping_category_id is required when SKU is shippable.'
      })
    }
  })

const updateSchema = z.object({
  id: z.string().length(10)
})

const schema = z.union([createSchema, updateSchema])

export const csvSkusSchema = z.array(schema)
