import { CommerceLayerClient } from '@commercelayer/sdk'
import cn from 'classnames'
import { ReactNode } from 'react'
import { ListImportProvider } from './Provider'

interface Props {
  sdkClient: CommerceLayerClient
  children: ReactNode
  pageSize: number
  polling: boolean
}

export function ListContainer({
  sdkClient,
  pageSize,
  polling,
  children
}: Props): JSX.Element {
  return (
    <ListImportProvider
      sdkClient={sdkClient}
      pageSize={pageSize}
      polling={polling}
    >
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
          <div className={cn({ 'opacity-40': isRefetching })}>{children}</div>
        )
      }}
    </ListImportProvider>
  )
}
