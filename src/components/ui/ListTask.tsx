import { ReactNode } from 'react'
import cn from 'classnames'
import { Pagination, PaginationProps } from './Pagination'
import { makeCurrentPageOffsets } from '#components/List/utils'

export interface ListTaskProps {
  title?: ReactNode
  actionButton?: ReactNode
  isDisabled?: boolean
  children?: ReactNode
  pagination?: {
    recordsPerPage: number
    recordCount: number
  } & Omit<PaginationProps, 'className' | 'isDisabled'>
}

export function ListTask({
  title,
  actionButton,
  isDisabled,
  children,
  pagination,
  ...rest
}: ListTaskProps): JSX.Element {
  const offsets =
    pagination != null
      ? makeCurrentPageOffsets({
          currentPage: pagination.currentPage,
          recordCount: pagination.recordCount,
          recordsPerPage: pagination.recordsPerPage
        })
      : null

  return (
    <div className='flex flex-col flex-1' {...rest}>
      <div className='flex justify-between pb-4 border-b border-gray-100'>
        <h2 className='text-gray-500'>{title}</h2>
        <div>{actionButton}</div>
      </div>
      <div
        className={cn({
          'opacity-40 pointer-events-none touch-none': isDisabled
        })}
      >
        {children}
      </div>
      {pagination != null && offsets != null ? (
        <div className='flex mt-auto items-center justify-between py-9'>
          <div className='text-gray-500 font-medium'>
            {offsets.firstOfPage}-{offsets.lastOfPage} of{' '}
            {pagination.recordCount}
          </div>

          <Pagination
            isDisabled={isDisabled}
            currentPage={pagination.currentPage}
            // eslint-disable-next-line react/jsx-handler-names
            onChangePageRequest={pagination.onChangePageRequest}
            pageCount={pagination.pageCount}
          />
        </div>
      ) : null}
    </div>
  )
}
