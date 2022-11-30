import { DetailsList } from '#ui/DetailsList'
import { DetailsRow } from '#ui/DetailsRow'
import { formatDate } from '#utils/date'
import { CommerceLayerClient } from '@commercelayer/sdk'
import { useImportDetailsContext } from './Provider'
import { RowParentResource } from './RowParentResource'
import { StatusBadge } from './StatusBadge'

interface Props {
  sdkClient: CommerceLayerClient
}

export function ImportDetails({ sdkClient }: Props): JSX.Element | null {
  const {
    state: { data }
  } = useImportDetailsContext()

  if (data == null) {
    return null
  }

  return (
    <DetailsList title='Details'>
      <RowParentResource sdkClient={sdkClient} />
      {data.status != null ? (
        <DetailsRow label='Status'>
          <StatusBadge job={data} />
        </DetailsRow>
      ) : null}
      {data.completed_at != null ? (
        <DetailsRow label='Completed at'>
          {formatDate(data.completed_at, true)}
        </DetailsRow>
      ) : null}
      {data.updated_at != null && data.completed_at == null ? (
        <DetailsRow label='Last update'>
          {formatDate(data.updated_at, true)}
        </DetailsRow>
      ) : null}
    </DetailsList>
  )
}
