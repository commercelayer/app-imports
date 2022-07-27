import { CustomerCreate } from "@commercelayer/sdk"
import { z } from "zod"

type FlatCsvRow = Pick<CustomerCreate, "email" | "password" | "reference" | "reference_origin"> & {
  customer_group_id?: string
}

const schema = z.object({
  email: z.string().email(),
  password: z.optional(z.preprocess((value: unknown) => `${value || ""}`, z.string())),
  reference: z.optional(z.string()),
  reference_origin: z.optional(z.string()),
  customer_group_id: z.optional(z.string().min(1)),
})

export const csvCustomersSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)