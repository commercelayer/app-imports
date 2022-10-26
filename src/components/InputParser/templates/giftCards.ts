import { GiftCardCreate } from '@commercelayer/sdk'

export const csvGiftCardsTemplate: Array<
  keyof GiftCardCreate | 'market_id' | 'gift_card_recipient_id'
> = [
  'code',
  'currency_code',
  'balance_cents',
  'balance_max_cents',
  'single_use',
  'rechargeable',
  'image_url',
  'expires_at',
  'recipient_email',
  'reference',
  'reference_origin',
  'market_id',
  'gift_card_recipient_id'
]
