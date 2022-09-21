import { CommerceLayerClient } from '@commercelayer/sdk'
import cn from 'classnames'
import { FC } from 'react'

import { Filters } from './Filters'
import { Pagination } from './Pagination'
import { ListImportProvider } from './Provider'
import { Table } from './Table'

interface Props {
  sdkClient: CommerceLayerClient
}

export const List: FC<Props> = ({ sdkClient }) => {
  return (
    <ListImportProvider sdkClient={sdkClient} pageSize={25} polling={false}>
      {({ state }) => {
        const { isLoading, currentPage, list } = state

        if (isLoading && list == null) {
          return <div>Loading list...</div>
        }

        if (list == null) {
          return null
        }

        const isRefetching = currentPage !== list.meta.currentPage
        return (
          <div className={cn('container', { 'opacity-40': isRefetching })}>
            <Filters />
            <Table />
            <Pagination />
          </div>
        )
      }}
    </ListImportProvider>
  )
}
