import { isFalsy } from '#utils/isFalsy'
import { StockItemCreate } from '@commercelayer/sdk'
import { z } from 'zod'

import { zodEnforceInt } from './zodUtils'

type FlatCsvRow = Pick<StockItemCreate, 'sku_code' | 'quantity' | 'reference' | 'reference_origin'> & {
  stock_location_id: string
  sku_id?: string
}

const schema = z
  .object({
    sku_code: z.optional(z.string().min(1)),
    quantity: zodEnforceInt,
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string()),
    stock_location_id: z.string().min(1),
    sku_id: z.optional(z.string().min(1))
  })
  .superRefine((data, ctx) => {
    if (isFalsy(data.sku_code) && isFalsy(data.sku_id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sku_id'],
        message: 'sku_id is required, if sku_code is not present'
      })
    }
  })

export const csvStockItemsSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)
