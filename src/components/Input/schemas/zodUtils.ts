import { isFalsy } from '#utils/isFalsy'
import { z } from 'zod'

type MaybeBoolean = boolean | undefined

export const zodEnforceBoolean = (optional?: boolean): z.ZodEffects<z.ZodBoolean | z.ZodOptional<z.ZodBoolean>, MaybeBoolean, MaybeBoolean> =>
  z.preprocess(
    (value) => (value === undefined || value === '' ? undefined : String(value).toLowerCase() === 'true'),
    isFalsy(optional) ? z.boolean() : z.optional(z.boolean())
  )

export const zodEnforceInt = z.preprocess((value) => parseFloat(String(value)), z.number().int().positive())

export const zodEnforceFloat = z.preprocess((value) => parseFloat(String(value)), z.number().positive())

export const zodEnforceDateString = z.preprocess((value: unknown) => {
  try {
    return new Date(value as string).toISOString()
  } catch {
    return undefined
  }
}, z.string())
