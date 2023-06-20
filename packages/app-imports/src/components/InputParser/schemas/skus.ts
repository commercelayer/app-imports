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

const schema = z
  .object({
    code: z.string().min(1),
    name: z.string().min(1),
    shipping_category_id: z.string().min(1),
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

export const csvSkusSchema = z.array(schema)
