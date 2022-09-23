import { AllowedResourceType } from 'App'

type VisibleInUI = boolean

const resources: Record<AllowedResourceType, VisibleInUI> = {
  addresses: true,
  bundles: true,
  skus: true,
  prices: true,
  coupons: true,
  sku_lists: true,
  customer_subscriptions: true,
  customers: true,
  gift_cards: true,
  stock_items: true,
  tax_categories: true,
  shipping_categories: true
}

const allResources = Object.keys(resources) as AllowedResourceType[]

export const availableResources = allResources.filter((r) => resources[r])

export const isAvailableResource = (resourceType: string): boolean =>
  availableResources.includes(resourceType as AllowedResourceType)
