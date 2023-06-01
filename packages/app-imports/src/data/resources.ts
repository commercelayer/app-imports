import {
  type AllowedResourceType,
  type AllowedParentResource,
  type ResourceWithParent
} from 'App'

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
  orders: true,
  line_items: true
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
  sku_lists: 'SKU lists',
  sku_options: 'SKU options',
  customer_subscriptions: 'Customer subscriptions',
  customers: 'Customers',
  gift_cards: 'Gift cards',
  stock_items: 'Stock items',
  tax_categories: 'Tax categories',
  shipping_categories: 'Shipping categories',
  orders: 'Orders',
  line_items: 'Line items'
}

/**
 * Parent Resources dictionary (we want singular names)
 */
const parentResourceNiceName: Record<AllowedParentResource, string> = {
  markets: 'Market',
  promotions: 'Promotion',
  price_lists: 'Price list',
  stock_locations: 'Stock location',
  tax_calculators: 'Tax calculator',
  sku_lists: 'Sku list'
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
  return (
    resourceNiceName[resource as AllowedResourceType] ??
    parentResourceNiceName[resource as AllowedParentResource] ??
    resource
  )
}

/**
 * To control if a resource has a parent resource to be selected
 */
const resourcesWithParent: Record<ResourceWithParent, AllowedParentResource> = {
  bundles: 'markets',
  gift_cards: 'markets',
  orders: 'markets',
  prices: 'price_lists',
  sku_options: 'markets',
  stock_items: 'stock_locations',
  tax_categories: 'tax_calculators',
  // direct parent resource for `coupons` is `promotion_rules` but since they don't have a name
  // and won't be searchable for users, we allow to search from `promotions` and implicitly we then provide to
  // api the related `promotion_rules` id.
  coupons: 'promotions'
}

/**
 * Check if a resource accepts a parent resource or not
 * @param resource - The resource type
 * @returns a boolean value and when true, param will is typed as `ResourceWithParent`
 */
function hasParentResource(resource: string): resource is ResourceWithParent {
  return resource in resourcesWithParent
}

/**
 * Get the parent resource from a given resource
 * @param resource - The resource type
 * @returns a valid parent resource  or false in case the resource does not have any parent
 */
export function getParentResourceIfNeeded(
  resource: string
): AllowedParentResource | false {
  if (resource == null || !hasParentResource(resource)) {
    return false
  }
  return resourcesWithParent[resource]
}
