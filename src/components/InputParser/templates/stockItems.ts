import { StockItemCreate } from '@commercelayer/sdk'

export const csvStockItemTemplate: Array<
  keyof StockItemCreate | 'stock_location_id'
> = [
  'sku_code',
  'quantity',
  'reference',
  'reference_origin',
  'stock_location_id'
]
