import cn from 'classnames'
import { ReactNode } from 'react'

export function Skeleton({ children }: { children: ReactNode }): JSX.Element {
  return <div className='animate-pulse'>{children}</div>
}

interface SkeletonItemProps {
  className?: string
  type?: 'box' | 'circle'
}

export function SkeletonItem({
  className,
  type = 'box'
}: SkeletonItemProps): JSX.Element {
  return (
    <div
      className={cn(className, {
        'bg-gray-200': true,
        'rounded-full': type === 'circle',
        rounded: type === 'box'
      })}
    />
  )
}
