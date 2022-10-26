import { ShippingCategoryCreate } from '@commercelayer/sdk'
import { z } from 'zod'

type FlatCsvRow = Omit<ShippingCategoryCreate, 'metadata'>

const schema = z
  .object({
    name: z.string().min(1),
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string())
  })
  .passthrough()

export const csvShippingCategorySchema: z.ZodType<FlatCsvRow[]> =
  z.array(schema)
