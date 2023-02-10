import { CustomerSubscriptionCreate } from '@commercelayer/sdk'
import { z } from 'zod'

type FlatCsvRow = CustomerSubscriptionCreate

const schema = z
  .object({
    customer_email: z.string().email(),
    reference_origin: z.optional(z.string()),
    customer_group_id: z.optional(z.string().min(1))
  })
  .passthrough()

export const csvCustomerSubscriptionsSchema: z.ZodType<FlatCsvRow[]> =
  z.array(schema)
