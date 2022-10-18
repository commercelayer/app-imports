import { AllowedResourceType } from 'App'

type VisibleInUI = boolean

/**
 * To control if a resource should not be visibile int the app UI
 */
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

/**
 * Resources dictionary
 */
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

/**
 * Typesafe arry of AllowedResourceType
 */
const allResources = Object.keys(resources) as AllowedResourceType[]

/**
 * A resource can be set as not available in UI by modifying the above `resources` object
 * @returns an array of available resources.
 */
export const availableResources = allResources.filter((r) => resources[r])

/**
 * Simple helper to understand if a resource is available
 * @returns `true` when the resource is available, `false` otherwise
 */
export const isAvailableResource = (resourceType: string): boolean =>
  availableResources.includes(resourceType as AllowedResourceType)

/**
 * @param resource - The resource type
 * @returns a string with the full resource name if found in `resourceNiceName` dictionary
 * Example: for `shipping_categories` resource type will return 'Shipping Categories'
 * but for `not_existing_resource` it will return 'not_existing_resource'
 */
export function showResourceNiceName(resource?: string): string {
  if (resource == null) {
    return '-'
  }
  return resourceNiceName[resource as AllowedResourceType] ?? resource
}
