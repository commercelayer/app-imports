import { showResourceNiceName, getParentResourceIfNeeded } from './resources'

describe('showResourceNiceName', () => {
  test('Should return the full resource name', () => {
    expect(showResourceNiceName('sku_lists')).toBe('SKU Lists')
  })

  test('Should return the the id name if not found in dictionary', () => {
    expect(showResourceNiceName('new_resource' as any)).toBe('new_resource')
  })

  test('Should not break if resource is empty', () => {
    expect(showResourceNiceName(undefined)).toBe('-')
  })
})

describe('getParentResourceIfNeeded', () => {
  test('Should return the parent resource type', () => {
    expect(getParentResourceIfNeeded('bundles')).toBe('markets')
    expect(getParentResourceIfNeeded('coupons')).toBe('promotion_rules')
    expect(getParentResourceIfNeeded('gift_cards')).toBe('markets')
    expect(getParentResourceIfNeeded('orders')).toBe('markets')
    expect(getParentResourceIfNeeded('prices')).toBe('price_lists')
    expect(getParentResourceIfNeeded('sku_options')).toBe('markets')
    expect(getParentResourceIfNeeded('stock_items')).toBe('stock_locations')
    expect(getParentResourceIfNeeded('tax_categories')).toBe('tax_calculators')
  })

  test('Should return false when resource does not have a parent', () => {
    expect(getParentResourceIfNeeded('sku')).toBe(false)
    expect(getParentResourceIfNeeded('customer_subscriptions')).toBe(false)
  })

  test('Should also return false when resource passed as argument is invalid', () => {
    expect(getParentResourceIfNeeded('skuuuu')).toBe(false)
    // @ts-expect-error
    expect(getParentResourceIfNeeded(undefined)).toBe(false)
    // @ts-expect-error
    expect(getParentResourceIfNeeded(42)).toBe(false)
  })
})
