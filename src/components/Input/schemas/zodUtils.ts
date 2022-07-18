import { z } from "zod"

export const zodEnforceBoolean = z.preprocess(
  (value) => (value === undefined || value === "" ? undefined : String(value).toLowerCase() === "true"),
  z.optional(z.boolean())
)

export const zodEnforceInt = z.preprocess((value) => parseFloat(String(value)), z.number().int().positive())

export const zodEnforceFloat = z.preprocess((value) => parseFloat(String(value)), z.number().positive())
