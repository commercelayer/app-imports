import cn from "classnames"
import { FC } from "react"

import { Filters } from "./Filters"
import { Pagination } from "./Pagination"
import { ListImportProvider } from "./Provider"
import { Table } from "./Table"

type Props = {
  accessToken: string
  organization: string
}

export const List: FC<Props> = ({ accessToken, organization }) => {
  return (
    <ListImportProvider accessToken={accessToken} organization={organization} pageSize={25} polling={false}>
      {({ state }) => {
        const { isLoading, currentPage, list } = state

        if (isLoading && !list) {
          return <div>Loading list...</div>
        }

        if (!list) {
          return null
        }

        const isRefetching = list.meta && currentPage !== list.meta.currentPage
        return (
          <div className={cn("container", { "opacity-40": isRefetching })}>
            <Filters />
            <Table />
            <Pagination />
          </div>
        )
      }}
    </ListImportProvider>
  )
}
