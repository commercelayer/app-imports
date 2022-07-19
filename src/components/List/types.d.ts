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
        payload: AllowedResourceType | "all"
      }

  export type ListImportContextValue = {
    state: ListImportContextState
    changePage: (page: number) => void
    updateFilter: (filter: UpdateFilterOptions) => void
  }

  export type ListImportAllowedStatusType = "completed" | "interrupted" | "in_progress" | "pending"

  export type ListImportContextState = {
    list?: ListResponse<Import>
    isLoading: boolean
    currentPage: number
    sort: {
      created_at: "asc" | "desc"
    }
    filters?: {
      resource_type_eq?: AllowedResourceType
      status_eq?: ListImportAllowedStatusType
    }
  }
}
