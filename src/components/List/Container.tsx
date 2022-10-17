import { CommerceLayerClient } from '@commercelayer/sdk'
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
        const { isLoading, list } = state

        if (isLoading && list == null) {
          return <div>Loading list...</div>
        }

        if (list == null) {
          return null
        }

        return <>{children}</>
      }}
    </ListImportProvider>
  )
}
