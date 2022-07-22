import { GiftCardCreate } from "@commercelayer/sdk"
import { z } from "zod"

import { zodEnforceInt, zodEnforceBoolean, zodEnforceDateString } from "./zodUtils"

type FlatCsvRow = Pick<
  GiftCardCreate,
  | "code"
  | "currency_code"
  | "balance_cents"
  | "balance_max_cents"
  | "single_use"
  | "rechargeable"
  | "image_url"
  | "recipient_email"
  | "reference"
  | "reference_origin"
> & {
  expires_at?: string
  market_id?: string
  gift_card_recipient_id?: string
}

const schema = z.object({
  code: z.optional(z.string()),
  currency_code: z.string().min(1),
  balance_cents: zodEnforceInt,
  balance_max_cents: z.optional(z.string()),
  single_use: zodEnforceBoolean(true),
  rechargeable: zodEnforceBoolean(true),
  image_url: z.optional(z.string().url()),
  expires_at: z.optional(zodEnforceDateString), // 2018-01-02T12:00:00.000Z
  recipient_email: z.optional(z.string()),
  reference: z.optional(z.string()),
  reference_origin: z.optional(z.string()),
  market_id: z.optional(z.string().min(1)),
  gift_card_recipient_id: z.optional(z.string().min(1)),
})

export const csvGiftCardsSchema: z.ZodType<FlatCsvRow[]> = z.array(schema)
