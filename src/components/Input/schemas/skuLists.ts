import { isFalsy } from '#utils/isFalsy'
import { SkuListCreate } from '@commercelayer/sdk'
import { z } from 'zod'

import { zodEnforceBoolean } from './zodUtils'

type FlatCsvRow = SkuListCreate

const schema = z
  .object({
    name: z.string().min(1),
    description: z.optional(z.string()),
    image_url: z.optional(z.string().url()),
    manual: zodEnforceBoolean(true),
    sku_code_regex: z.optional(z.string()),
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string())
  })
  .superRefine((data, ctx) => {
    if (isFalsy(data.manual) && isFalsy(data.sku_code_regex)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sku_code_regex'],
        message: 'sku_code_regex is required, if manual is falsy'
      })
    }
  })

export const csvSkuListSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)
