import { z } from 'zod'

const schema = z.object({
  name: z.optional(z.string().min(1))
})

export const csvTagsSchema = z.array(schema)
