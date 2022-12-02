import { makeSomeAdjacentPages } from '#components/List/utils'
import cn from 'classnames'
import { CaretRight, CaretLeft } from 'phosphor-react'

export interface PaginationProps {
  className?: string
  isDisabled?: boolean
  currentPage: number
  onChangePageRequest: (pageNumber: number) => void
  pageCount: number
}

export function Pagination({
  className,
  currentPage,
  isDisabled,
  onChangePageRequest,
  pageCount,
  ...rest
}: PaginationProps): JSX.Element | null {
  const nextPages = makeSomeAdjacentPages({
    currentPage,
    // we want to show always 3 buttons, so on first page we need 2 next pages
    adjacentPagesCount: currentPage === 1 ? 2 : 1,
    pageCount,
    direction: 'forward',
    excludeCurrentPage: true
  })

  const prevPages = makeSomeAdjacentPages({
    currentPage,
    adjacentPagesCount: 1,
    pageCount,
    direction: 'backward',
    excludeCurrentPage: true
  })

  // hide pagination if is only 1 page
  if (nextPages.length === 0 && currentPage === 1) {
    return null
  }

  return (
    <div
      className={cn([
        'flex gap-2',
        className,
        {
          'opacity-40 pointer-events-none touch-none': isDisabled
        }
      ])}
      {...rest}
    >
      {currentPage > 1 ? (
        <PaginationButton
          data-test-id='pagination-btn-back'
          onClick={() => onChangePageRequest(currentPage - 1)}
        >
          <CaretLeft />
        </PaginationButton>
      ) : null}

      {prevPages.map((p) => (
        <PaginationButton
          key={p}
          data-test-id='pagination-btn'
          onClick={() => onChangePageRequest(p)}
        >
          {p}
        </PaginationButton>
      ))}

      <PaginationButton data-test-id='pagination-btn' isActive>
        {currentPage}
      </PaginationButton>

      {nextPages.map((p) => {
        const isCurrentPage = p === currentPage
        return (
          <PaginationButton
            key={p}
            data-test-id='pagination-btn'
            isActive={isCurrentPage}
            onClick={isCurrentPage ? undefined : () => onChangePageRequest(p)}
          >
            {p}
          </PaginationButton>
        )
      })}
      {currentPage < pageCount ? (
        <PaginationButton
          data-test-id='pagination-btn-next'
          onClick={() => onChangePageRequest(currentPage + 1)}
        >
          <CaretRight />
        </PaginationButton>
      ) : null}
    </div>
  )
}

interface PaginationButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  isActive?: boolean
}

function PaginationButton({
  isActive,
  children,
  ...props
}: PaginationButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={cn([
        'border border-gray-100 text text-sm text-gray-500 font-medium rounded w-[46px] h-[38px] flex items-center justify-center',
        {
          'border-2 border-black text-black': isActive
        }
      ])}
    >
      {children}
    </button>
  )
}