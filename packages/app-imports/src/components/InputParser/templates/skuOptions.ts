import { SkuOptionCreate } from '@commercelayer/sdk'

export const csvSkuOptionTemplate: Array<keyof SkuOptionCreate | 'market_id'> =
  [
    'name',
    'currency_code',
    'market_id',
    'description',
    'price_amount_cents',
    'delay_hours',
    'sku_code_regex',
    'reference',
    'reference_origin'
  ]
