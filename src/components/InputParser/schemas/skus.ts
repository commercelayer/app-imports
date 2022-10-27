import { SkuCreate } from '@commercelayer/sdk'
import { z } from 'zod'

import { zodEnforceInt, zodEnforceBoolean, zodEnforceFloat } from './zodUtils'

enum AllowedUnitOfWeightEnum {
  'gr' = 'gr',
  'lb' = 'gr',
  'oz' = 'oz'
}

type FlatCsvRow = Omit<SkuCreate, 'unit_of_weight' | 'shipping_category'> & {
  unit_of_weight?: AllowedUnitOfWeightEnum
  shipping_category_id: string
}

const schema = z
  .object({
    code: z.string().min(1),
    name: z.string().min(1),
    shipping_category_id: z.string().min(1),
    description: z.optional(z.string()),
    image_url: z.optional(z.string().url()),
    pieces_per_pack: z.optional(zodEnforceInt),
    weight: z.optional(zodEnforceFloat),
    unit_of_weight: z.optional(z.nativeEnum(AllowedUnitOfWeightEnum)),
    hs_tariff_number: z.optional(z.string()),
    do_not_ship: zodEnforceBoolean(true),
    do_not_track: zodEnforceBoolean(true),
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string())
  })
  .passthrough()

export const csvSkusSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)