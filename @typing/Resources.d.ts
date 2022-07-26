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
}
