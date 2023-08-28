import {
  Icon,
  ListItem,
  Text,
  RadialProgress,
  Button,
  useTokenProvider,
  formatResourceName
} from '@commercelayer/app-elements'
import { type Import, CommerceLayerStatic } from '@commercelayer/sdk'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'
import { getUiStatus } from '#components/List/utils'
import { getProgressPercentage } from '#utils/getProgressPercentage'
import { appRoutes } from '#data/routes'
import { Link } from 'wouter'
import { useListContext } from './Provider'
import { type ListableResourceType } from '@commercelayer/sdk/lib/cjs/api'
import { useState } from 'react'

interface Props {
  job: Import
}

export function Item({ job }: Props): JSX.Element {
  const { canUser } = useTokenProvider()
  const { deleteImport } = useListContext()
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>()

  const canDelete =
    (job.status === 'pending' || job.status === 'in_progress') &&
    canUser('destroy', 'imports')

  return (
    <Link href={appRoutes.details.makePath(job.id)}>
      <ListItem tag='a' icon={<TaskIcon job={job} />}>
        <div>
          <Text tag='div' weight='semibold'>
            {formatResourceName({
              resource: job.resource_type as ListableResourceType,
              count: 'plural',
              format: 'title'
            })}
          </Text>
          <Text tag='div' size='small' variant='info' weight='medium'>
            <DescriptionLine job={job} />
          </Text>
          {deleteErrorMessage != null && (
            <Text variant='danger' size='small'>
              {deleteErrorMessage}
            </Text>
          )}
        </div>
        {canDelete ? (
          <div>
            <Button
              variant='danger'
              type='button'
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setDeleteErrorMessage(null)
                deleteImport(job.id).catch((error) => {
                  setDeleteErrorMessage(
                    CommerceLayerStatic.isApiError(error)
                      ? error.errors.map((e) => e.detail).join(', ')
                      : 'Could not delete'
                  )
                })
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Icon name='caretRight' />
        )}
      </ListItem>
    </Link>
  )
}

function TaskIcon({ job }: { job: Import }): JSX.Element {
  const status = getUiStatus(job.status)
  if (status === 'progress') {
    return <RadialProgress percentage={getProgressPercentage(job)?.value} />
  }

  if (status === 'pending') {
    return <RadialProgress />
  }

  if (status === 'danger') {
    return <Icon gap='large' name='x' background='red' />
  }

  if (status === 'success') {
    return <Icon gap='large' name='check' background='green' />
  }

  return <Icon gap='large' name='minus' background='gray' />
}
