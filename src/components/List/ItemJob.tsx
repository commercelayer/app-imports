import { Button } from '#components/ui/Button'
import { StatusIcon } from '#components/ui/StatusIcon'
import { showResourceNiceName } from '#data/resources'
import { formatDate } from '#utils/date'
import { Import } from '@commercelayer/sdk'
import { CaretRight } from 'phosphor-react'
import { getProgressPercentage, getUiStatus } from './utils'

interface Props {
  job: Import
  onDeleteRequest: (id: string) => void
  onShowRequest: (id: string) => void
}

export function ItemJob({
  job,
  onShowRequest,
  onDeleteRequest
}: Props): JSX.Element {
  const uiStatus = getUiStatus(job.status)
  const percentage = getProgressPercentage(job)
  const canDelete = job.status === 'pending' || job.status === 'in_progress'

  return (
    <div className='flex gap-4 px-2 sm:px-5 py-5 border-b border-gray-100'>
      <div className='scale-75 sm:scale-100'>
        <StatusIcon
          status={uiStatus}
          percentage={uiStatus === 'progress' ? percentage.value : undefined}
        />
      </div>
      <div className='leading-none flex flex-col justify-between items-start'>
        <button
          onClick={() => {
            onShowRequest(job.id)
          }}
          className='font-semibold hover:underline'
        >
          <h4>{showResourceNiceName(job.resource_type)}</h4>
        </button>
        <DescriptionLine job={job} />
      </div>
      <div className='ml-auto flex items-center'>
        {canDelete ? (
          <Button
            variant='danger'
            size='small'
            onClick={() => {
              onDeleteRequest(job.id)
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant='link'
            size='small'
            onClick={() => {
              onShowRequest(job.id)
            }}
          >
            <CaretRight />
          </Button>
        )}
      </div>
    </div>
  )
}

const DescriptionLine = ({ job }: { job: Import }): JSX.Element => {
  const hasErrors = job.errors_count != null && job.errors_count > 0
  const percentage = getProgressPercentage(job)
  return (
    <div className='text-sm font-medium text-gray-500'>
      {job.status === 'pending' ? (
        <div>Pending</div>
      ) : job.status === 'in_progress' ? (
        percentage.value === 100 ? (
          // import job remains few seconds at 100% with status in_progress
          <span>Finalizing...</span>
        ) : (
          percentage.formatted
        )
      ) : job.status === 'interrupted' ? (
        <div>
          <span className='text-red-400'>Import failed</span> on{' '}
          {formatDate(job.updated_at)}
        </div>
      ) : job.status === 'completed' ? (
        hasErrors ? (
          <div>
            Imported with{' '}
            <span className='text-red-400'>{job.errors_count}</span>
          </div>
        ) : (
          <div>Imported on {formatDate(job.completed_at)}</div>
        )
      ) : (
        '-'
      )}
    </div>
  )
}
