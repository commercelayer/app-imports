import { AllowedResourceType } from 'App'

type VisibleInUI = boolean

const resources: Record<AllowedResourceType, VisibleInUI> = {
  addresses: true,
  bundles: true,
  skus: true,
  prices: true,
  coupons: true,
  sku_lists: true,
  sku_options: true,
  customer_subscriptions: true,
  customers: true,
  gift_cards: true,
  stock_items: true,
  tax_categories: true,
  shipping_categories: true,
  orders: true
}

const resourceNiceName: Record<AllowedResourceType, string> = {
  addresses: 'Addresses',
  bundles: 'Bundles',
  skus: 'SKUs',
  prices: 'Prices',
  coupons: 'Coupons',
  sku_lists: 'SKU Lists',
  sku_options: 'SKU Options',
  customer_subscriptions: 'Customer Subscriptions',
  customers: 'Customers',
  gift_cards: 'Gift Cards',
  stock_items: 'Stock Items',
  tax_categories: 'Tax Categories',
  shipping_categories: 'Shipping Categories',
  orders: 'Orders'
}

const allResources = Object.keys(resources) as AllowedResourceType[]

export const availableResources = allResources.filter((r) => resources[r])

export const isAvailableResource = (resourceType: string): boolean =>
  availableResources.includes(resourceType as AllowedResourceType)

export function showResourceNiceName(resource: AllowedResourceType): string {
  return resourceNiceName[resource] ?? resource
}
