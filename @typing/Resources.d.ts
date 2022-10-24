declare module 'App' {
  export type AllowedResourceType =
    | 'skus'
    | 'sku_lists'
    | 'prices'
    | 'coupons'
    | 'gift_cards'
    | 'customers'
    | 'customer_subscriptions'
    | 'tax_categories'
    | 'stock_items'
    | 'addresses'
    | 'bundles'
    | 'shipping_categories'
    | 'sku_options'
    | 'orders'

  export type ResourceWithParent =
    | 'bundles'
    | 'coupons'
    | 'gift_cards'
    | 'orders'
    | 'prices'
    | 'sku_options'
    | 'stock_items'
    | 'tax_categories'

  export type AllowedParentResource =
    | 'markets'
    | 'promotion_rules'
    | 'price_lists'
    | 'stock_locations'
    | 'tax_calculators'
    | 'sku_list'
}
