import { isFalsy } from '#utils/isFalsy'
import { z } from 'zod'

type MaybeBoolean = boolean | undefined

export function zodEnforceBoolean(
  optional?: boolean
): z.ZodEffects<
  z.ZodBoolean | z.ZodOptional<z.ZodBoolean>,
  MaybeBoolean,
  MaybeBoolean
> {
  return z.preprocess(
    (value) =>
      value === undefined || value === ''
        ? undefined
        : String(value).toLowerCase() === 'true',
    isFalsy(optional) ? z.boolean() : z.optional(z.boolean())
  )
}

export const zodEnforceInt = z.preprocess(
  (value) => parseFloat(String(value)),
  z.number().int().positive()
)

export const zodEnforceFloat = z.preprocess(
  (value) => parseFloat(String(value)),
  z.number().positive()
)

export const zodEnforceDateString = z.preprocess((value: unknown) => {
  try {
    return new Date(value as string).toISOString()
  } catch {
    return undefined
  }
}, z.string())

interface DefaultEnumLike {
  [k: string]: string | number
  [nu: number]: string
}

export function zodCaseInsensitiveNativeEnum<T extends DefaultEnumLike>(
  enumValue: T
): z.ZodEffects<z.ZodNativeEnum<T>> {
  return z.preprocess(
    (enumValue) => String(enumValue).toLowerCase(),
    z.nativeEnum(enumValue)
  )
}
