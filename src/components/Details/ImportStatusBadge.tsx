import { Badge, BadgeVariant } from '#components/ui/Badge'
import { Import } from '@commercelayer/sdk'

interface Props {
  job: Import
}

export function ImportStatusBadge({ job }: Props): JSX.Element {
  const errorsCount =
    job.errors_count != null && job.errors_count > 0
      ? job.errors_count
      : undefined

  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <div>
        <Badge {...getUiStatusVariant(job.status, errorsCount)} />
      </div>
    </div>
  )
}

function getUiStatusVariant(
  apiStatus?: string,
  errorsCount?: number
): {
  variant: BadgeVariant
  label: string
} {
  if (apiStatus === 'in_progress') {
    return {
      variant: 'primary',
      label: 'in progress'
    }
  }

  if (apiStatus === 'interrupted') {
    return {
      variant: 'danger',
      label: 'interrupted'
    }
  }

  if (apiStatus === 'completed' && errorsCount != null) {
    return {
      variant: 'warning',
      label: 'completed with errors'
    }
  }

  if (apiStatus === 'completed') {
    return {
      variant: 'success',
      label: 'completed'
    }
  }

  if (apiStatus === 'pending') {
    return {
      variant: 'secondary',
      label: 'pending'
    }
  }

  return {
    variant: 'secondary',
    label: apiStatus ?? 'N/A'
  }
}
