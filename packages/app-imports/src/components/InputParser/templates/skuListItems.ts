import { type SkuListItemCreate } from '@commercelayer/sdk'

export const csvSkuListItemsTemplate: Array<
  keyof SkuListItemCreate | 'sku_list_id' | 'sku_id'
> = ['sku_list_id', 'sku_id']
