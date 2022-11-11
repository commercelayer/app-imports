import { ErrorBoundary } from '#components/ErrorBoundary'
import { Table } from '#components/ui/Table'

interface Props {
  title: string
  data: Array<Record<string, string | Object>>
  limit: number
  className?: string
}

export function ImportPreview({ title, data, limit }: Props): JSX.Element {
  return (
    <ErrorBoundary
      errorTitle='We were unable to show the preview'
      errorDescription='Try to upload a different file'
    >
      <Table title={title} data={data} limit={limit} />
    </ErrorBoundary>
  )
}
