import { type SkuCreate } from '@commercelayer/sdk'
import { type CsvTagsColumn } from '#components/InputParser/templates/_tags'

export const csvSkusTemplate: Array<
  keyof SkuCreate | 'shipping_category_id' | CsvTagsColumn
> = ['code', 'name', 'shipping_category_id', 'description', 'image_url']
