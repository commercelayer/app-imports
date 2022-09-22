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
    | 'price_tiers'
  // TODO:
  // | "orders"
  // | "sku_list_items"
  // | "sku_options"
  // | "shipping_categories"

  export interface ParentResourceByResourceType {
    bundles: 'market'
    coupons: 'promotion_rules'
    gift_cards: 'market'
    orders: 'market'
    prices: 'price_list'
    sku_list_items: 'sku_list'
    sku_options: 'market'
    stock_items: 'stock_location'
    tax_categories: 'tax_calculator'
  }

  export type AllowedParentResource =
    | 'markets'
    | 'promotion_rules'
    | 'price_lists'
    | 'stock_locations'
    | 'tax_calculators'
}
