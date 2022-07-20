import { z } from "zod"

export const zodEnforceBoolean = (optional?: boolean) =>
  z.preprocess(
    (value) => (value === undefined || value === "" ? undefined : String(value).toLowerCase() === "true"),
    optional ? z.optional(z.boolean()) : z.boolean()
  )

export const zodEnforceInt = z.preprocess((value) => parseFloat(String(value)), z.number().int().positive())

export const zodEnforceFloat = z.preprocess((value) => parseFloat(String(value)), z.number().positive())
