import { z } from "zod"

import { zodEnforceBoolean, zodEnforceInt, zodEnforceFloat } from "./zodUtils"

describe("check zodEnforceBoolean", () => {
  test("should parse true string text as boolean `true`", () => {
    expect(zodEnforceBoolean.parse("true")).toBe(true)
  })

  test("should parse false string text as boolean `false`", () => {
    expect(zodEnforceBoolean.parse("false")).toBe(false)
  })

  test("should allow undefined", () => {
    expect(z.optional(zodEnforceBoolean).parse(undefined)).toBe(undefined)
  })

  test("should parse empty string as undefined", () => {
    expect(z.optional(zodEnforceBoolean).parse("")).toBe(undefined)
  })
})

describe("check zodEnforceInt", () => {
  test("should allow int ", () => {
    expect(zodEnforceInt.parse(13)).toBe(13)
  })

  test("should parse string number ", () => {
    expect(zodEnforceInt.parse("13")).toBe(13)
  })

  test("should reject negative ", () => {
    expect(zodEnforceInt.safeParse(0).success).toBe(false)
    expect(zodEnforceInt.safeParse(-4).success).toBe(false)
    expect(zodEnforceInt.safeParse("-7").success).toBe(false)
  })

  test("should reject string float ", () => {
    expect(zodEnforceInt.safeParse("13.5").success).toBe(false)
  })
})

describe("check zodEnforceFloat", () => {
  test("should allow int ", () => {
    expect(zodEnforceFloat.parse(13)).toBe(13)
  })

  test("should allow float ", () => {
    expect(zodEnforceFloat.parse(13.99)).toBe(13.99)
  })

  test("should parse string number ", () => {
    expect(zodEnforceFloat.parse("13")).toBe(13)
  })

  test("should allow string float ", () => {
    expect(zodEnforceFloat.parse("13.5")).toBe(13.5)
  })

  test("should reject negative ", () => {
    expect(zodEnforceFloat.safeParse(0).success).toBe(false)
    expect(zodEnforceFloat.safeParse(-4).success).toBe(false)
    expect(zodEnforceFloat.safeParse("-7.54").success).toBe(false)
  })
})
