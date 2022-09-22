import { AllowedResourceType } from 'App'

const resources: Record<AllowedResourceType, boolean> = {
  addresses: true,
  bundles: true,
  skus: true,
  prices: true,
  price_tiers: true,
  coupons: true,
  sku_lists: true,
  customer_subscriptions: true,
  customers: true,
  gift_cards: true,
  stock_items: true,
  tax_categories: true
}

const allResources = Object.keys(resources) as AllowedResourceType[]

export const availableResources = allResources.filter((r) => resources[r])

export const isAvailableResource = (resourceType: string): boolean =>
  availableResources.includes(resourceType as AllowedResourceType)
