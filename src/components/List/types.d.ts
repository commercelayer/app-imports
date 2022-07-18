import { Import } from "@commercelayer/sdk"
import { ListResponse } from "@commercelayer/sdk/lib/cjs/resource"

declare module "App" {
  export type UpdateFilterOptions =
    | {
        type: "filterStatus"
        payload: ListImportAllowedStatusType | "all"
      }
    | {
        type: "filterResourceType"
        payload: ListImportAllowedFilterType | "all"
      }

  export type ListImportContextValue = {
    state: ListImportContextState
    changePage: (page: number) => void
    updateFilter: (filter: UpdateFilterOptions) => void
  }

  export type ListImportAllowedFilterType = "skus" | "bundles" | "sku_options"
  export type ListImportAllowedStatusType = "completed" | "interrupted" | "in_progress" | "pending"

  export type ListImportContextState = {
    list?: ListResponse<Import>
    isLoading: boolean
    currentPage: number
    sort: {
      created_at: "asc" | "desc"
    }
    filters?: {
      resource_type_eq?: ListImportAllowedFilterType
      status_eq?: ListImportAllowedStatusType
    }
  }
}
