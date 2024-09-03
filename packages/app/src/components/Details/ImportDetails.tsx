import {
  ListDetailsItem,
  ListDetails,
  formatDate,
  useTokenProvider
} from '@commercelayer/app-elements'
import { type CommerceLayerClient } from '@commercelayer/sdk'
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

  const { user } = useTokenProvider()

  if (data == null) {
    return null
  }

  return (
    <ListDetails title='Detalles'>
      <RowParentResource sdkClient={sdkClient} />
      {data.status != null ? (
        <ListDetailsItem label='Estado'>
          <StatusBadge job={data} />
        </ListDetailsItem>
      ) : null}
      {data.completed_at != null ? (
        <ListDetailsItem label='Completed at'>
          {formatDate({
            isoDate: data.completed_at,
            format: 'fullWithSeconds',
            timezone: user?.timezone
          })}
        </ListDetailsItem>
      ) : null}
      {data.updated_at != null && data.completed_at == null ? (
        <ListDetailsItem label='Última actualización'>
          {formatDate({
            isoDate: data.updated_at,
            format: 'fullWithSeconds',
            timezone: user?.timezone
          })}
        </ListDetailsItem>
      ) : null}
    </ListDetails>
  )
}
