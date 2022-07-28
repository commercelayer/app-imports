declare module "App" {
  export type AllowedResourceType =
    | "skus"
    | "sku_lists"
    | "prices"
    | "coupons"
    | "gift_cards"
    | "customers"
    | "customer_subscriptions"
    | "tax_categories"
    | "stock_items"
  // TODO:
  // | "orders"
  // | "sku_list_items"
  // | "bundles"
  // | "sku_options"

  export type ParentResourceByResourceType = {
    bundles: "market"
    coupons: "promotion_rules"
    gift_cards: "market"
    orders: "market"
    prices: "price_list"
    sku_list_items: "sku_list"
    sku_options: "market"
    stock_items: "stock_location"
    tax_categories: "tax_calculator"
  }

  export type AllowedParentResource =
    | "markets"
    | "promotion_rules"
    | "price_lists"
    | "stock_locations"
    | "tax_calculators"
}
