import { z } from 'zod'
import { zodEnforceInt } from './zodUtils'

const schema = z
  .object({
    position: z.optional(zodEnforceInt),
    sku_code: z.optional(z.string().min(1)),
    quantity: z.optional(zodEnforceInt),
    sku_list_id: z.string().min(1),
    sku_id: z.string().min(1)
  })
  .passthrough()

export const csvSkuListItemsSchema = z.array(schema)
