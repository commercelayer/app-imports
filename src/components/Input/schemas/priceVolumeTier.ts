import { PriceVolumeTierCreate } from '@commercelayer/sdk'
import { z } from 'zod'
import { zodEnforceInt } from './zodUtils'

type FlatCsvRow = Omit<PriceVolumeTierCreate, 'price'> & {
  price_id?: string
}

const makeSchema = (): z.ZodType<FlatCsvRow> =>
  z.object({
    name: z.string().min(1),
    up_to: z.optional(zodEnforceInt),
    price_amount_cents: zodEnforceInt,
    // TODO: understand if price_id is a parent resource or just a mandatory relationship
    price_id: z.string().min(1)
  })

export const csvPriceVolumeTierSchema: z.ZodType<FlatCsvRow[]> = z.array(
  makeSchema()
)
