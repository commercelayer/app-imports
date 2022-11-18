import { ReactNode } from 'react'
import cn from 'classnames'

interface Props {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <div
      className={cn(
        'bg-gray-50 flex flex-col p-14 min-h-[300px] rounded-lg',
        className
      )}
      {...rest}
    >
      <h4 className='font-semibold text-title mb-4'>{title}</h4>

      {description != null ? (
        <div className='font-medium text-gray-500'>{description}</div>
      ) : null}

      {action !== null ? <div className='mt-16'>{action}</div> : null}
    </div>
  )
}
