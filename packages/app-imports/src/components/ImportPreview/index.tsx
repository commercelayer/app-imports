import { TableData, ErrorBoundary } from '@commercelayer/core-app-elements'

interface Props {
  title: string
  data: Array<Record<string, string | Object>>
  limit: number
}

export function ImportPreview({ title, data, limit }: Props): JSX.Element {
  return (
    <ErrorBoundary
      errorTitle='We were unable to show the preview'
      errorDescription='Try to upload a different file'
    >
      <TableData title={title} data={data} limit={limit} showTotal />
    </ErrorBoundary>
  )
}
