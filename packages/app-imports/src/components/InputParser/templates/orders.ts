import { OrderCreate } from '@commercelayer/sdk'

export const csvOrdersTemplate: Array<keyof OrderCreate | 'market_id'> = [
  'autorefresh',
  'guest',
  'customer_email',
  'customer_password',
  'language_code',
  'shipping_country_code_lock',
  'coupon_code',
  'gift_card_code',
  'gift_card_or_coupon_code',
  'cart_url',
  'return_url',
  'terms_url',
  'privacy_url'
]
