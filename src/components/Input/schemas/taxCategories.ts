import { isFalsy } from '#utils/isFalsy'
import { TaxCategoryCreate } from '@commercelayer/sdk'
import { z } from 'zod'

type FlatCsvRow = Pick<
  TaxCategoryCreate,
  'sku_code' | 'reference' | 'reference_origin'
> & {
  sku_id?: string
  tax_calculator_id: string
}

const schema = z
  .object({
    sku_code: z.optional(z.string().min(1)),
    reference: z.optional(z.string()),
    reference_origin: z.optional(z.string()),
    sku_id: z.optional(z.string().min(1)),
    tax_calculator_id: z.string().min(1)
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

export const csvTaxCategoriesSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)
