import { Badge, BadgeVariant } from '#components/ui/Badge'
import { getProgressPercentage } from '#utils/getProgressPercentage'
import { Import } from '@commercelayer/sdk'

interface Props {
  job: Import
}

export function ImportStatusBadge({ job }: Props): JSX.Element {
  const errorsCount =
    job.errors_count != null && job.errors_count > 0
      ? job.errors_count
      : undefined
  const percentage = getProgressPercentage(job)

  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <div>
        <Badge {...getUiStatusVariant(job.status, errorsCount)} />
      </div>

      {job.status === 'in_progress' && percentage.value < 100 ? (
        <div className='w-full h-2 bg-gray-200 rounded-sm overflow-hidden'>
          <div
            className='h-full bg-primary transition-all'
            style={{
              width: percentage.formatted
            }}
          />
        </div>
      ) : null}
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
      label: 'In progress'
    }
  }

  if (apiStatus === 'interrupted') {
    return {
      variant: 'danger',
      label: 'Interrupted'
    }
  }

  if (apiStatus === 'completed' && errorsCount != null) {
    return {
      variant: 'warning',
      label: 'Completed with errors'
    }
  }

  if (apiStatus === 'completed') {
    return {
      variant: 'success',
      label: 'Completed'
    }
  }

  if (apiStatus === 'pending') {
    return {
      variant: 'secondary',
      label: 'Pending'
    }
  }

  return {
    variant: 'secondary',
    label: apiStatus ?? 'N/A'
  }
}
