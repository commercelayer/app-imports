import { CaretRight } from 'phosphor-react'
import { Button } from './Button'
import { StatusIcon, StatusUI } from './StatusIcon'

export interface ListTaskItemProps {
  status: StatusUI
  progressPercentage?: number
  title: string
  description?: React.ReactNode
  onClick?: () => void
  onCancelRequest?: () => void
}

export function ListTaskItem({
  status,
  progressPercentage,
  onClick,
  title,
  onCancelRequest,
  description,
  ...rest
}: ListTaskItemProps): JSX.Element {
  return (
    <div
      className='flex gap-4 px-2 sm:px-5 py-5 border-b border-gray-100 last:border-b-0'
      {...rest}
    >
      <div className='scale-75 sm:scale-100'>
        <StatusIcon
          status={status}
          percentage={status === 'progress' ? progressPercentage : undefined}
        />
      </div>

      <div className='leading-none flex flex-col justify-between items-start'>
        <button onClick={onClick} className='font-semibold hover:underline'>
          <h4 data-test-id='list-task-item-title'>{title}</h4>
        </button>
        {description != null && (
          <div
            className='text-sm font-medium text-gray-500'
            data-test-id='list-task-item-description'
          >
            {description}
          </div>
        )}
      </div>

      <div className='ml-auto flex items-center'>
        {onCancelRequest != null ? (
          <Button
            variant='danger'
            size='small'
            onClick={onCancelRequest}
            data-test-id='list-task-item-btn-cancel'
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant='link'
            size='small'
            onClick={onClick}
            data-test-id='list-task-item-btn-view'
          >
            <CaretRight />
          </Button>
        )}
      </div>
    </div>
  )
}
