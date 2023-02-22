import {
  ListDetailsItem,
  ListDetails,
  formatDate,
  useTokenProvider
} from '@commercelayer/app-elements'
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

  const {
    settings: { timezone }
  } = useTokenProvider()

  if (data == null) {
    return null
  }

  return (
    <ListDetails title='Details'>
      <RowParentResource sdkClient={sdkClient} />
      {data.status != null ? (
        <ListDetailsItem label='Status'>
          <StatusBadge job={data} />
        </ListDetailsItem>
      ) : null}
      {data.completed_at != null ? (
        <ListDetailsItem label='Completed at'>
          {formatDate(data.completed_at, true, timezone)}
        </ListDetailsItem>
      ) : null}
      {data.updated_at != null && data.completed_at == null ? (
        <ListDetailsItem label='Last update'>
          {formatDate(data.updated_at, true, timezone)}
        </ListDetailsItem>
      ) : null}
    </ListDetails>
  )
}
