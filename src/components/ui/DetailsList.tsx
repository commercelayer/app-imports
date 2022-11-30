import { ReactNode } from 'react'
import { Skeleton, SkeletonItem } from './Skeleton'

interface DetailsListProps {
  title: string
  children: ReactNode
  className?: string
  isLoading?: boolean
  loadingLines?: number
}

export function DetailsList({
  title,
  children,
  isLoading,
  loadingLines = 3,
  ...rest
}: DetailsListProps): JSX.Element {
  if (isLoading === true) {
    return (
      <div {...rest}>
        <Skeleton>
          <h4 className='text-[18px] font-semibold mb-4'>
            <SkeletonItem className='h-7 w-32' />
          </h4>
          {[...Array(loadingLines).keys()].map((_, idx) => (
            <SkeletonItem
              key={`loading-${idx}`}
              className='h-[53px] w-full mb-1'
            />
          ))}
        </Skeleton>
      </div>
    )
  }

  return (
    <div {...rest}>
      <h4 className='text-[18px] font-semibold mb-4'>{title}</h4>
      <div>{children}</div>
    </div>
  )
}
