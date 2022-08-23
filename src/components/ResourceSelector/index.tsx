import { AllowedParentResource, AllowedResourceType } from "App"
import { FC, useEffect } from "react"

import SearchInput from "./SearchInput"
import SearchResults from "./SearchResults"

type Props = {
  resourceType: AllowedResourceType
  onNotNeeded: () => void
}

const parentResourceByResourceType: Record<string, AllowedParentResource> = {
  // bundles: "market",
  // sku_list_items: "sku_list",
  // sku_options: "market",
  // orders: "market",
  coupons: "promotion_rules",
  gift_cards: "markets",
  prices: "price_lists",
  stock_items: "stock_locations",
  tax_categories: "tax_calculators",
  // customer_subscriptions: null,
  // customers: null,
  // sku_lists: null,
  // skus: null,
}

export const ParentResourceSelector: FC<Props> = ({ resourceType, onNotNeeded }) => {
  const parentResource = parentResourceByResourceType[resourceType]

  useEffect(() => {
    if (!parentResource && onNotNeeded) {
      onNotNeeded()
    }
  }, [parentResource, onNotNeeded])

  if (!parentResource) {
    return <div>No parent resource for {resourceType}</div>
  }

  return (
    <div>
      <SearchInput parentResource={parentResource} label="Parent resource" />
      <div>
        <h4>Results:</h4>
        <SearchResults />
      </div>
    </div>
  )
}
