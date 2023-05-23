import {
  Icon,
  ListItem,
  Text,
  RadialProgress,
  Button,
  useTokenProvider
} from '@commercelayer/app-elements'
import { type Import } from '@commercelayer/sdk'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'
import { getUiStatus } from '#components/List/utils'
import { getProgressPercentage } from '#utils/getProgressPercentage'
import { appRoutes } from '#data/routes'
import { Link } from 'wouter'
import { showResourceNiceName } from '#data/resources'
import { useListContext } from './Provider'

interface Props {
  job: Import
}

export function Item({ job }: Props): JSX.Element {
  const { canUser } = useTokenProvider()
  const { deleteImport } = useListContext()

  const canDelete =
    (job.status === 'pending' || job.status === 'in_progress') &&
    canUser('destroy', 'imports')

  return (
    <Link href={appRoutes.details.makePath(job.id)}>
      <ListItem tag='a' icon={<TaskIcon job={job} />}>
        <div>
          <Text tag='div' weight='semibold'>
            {showResourceNiceName(job.resource_type)}
          </Text>
          <Text tag='div' size='small' variant='info' weight='medium'>
            <DescriptionLine job={job} />
          </Text>
        </div>
        {canDelete ? (
          <Button
            variant='danger'
            onClick={() => {
              deleteImport(job.id)
            }}
          >
            Cancel
          </Button>
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
