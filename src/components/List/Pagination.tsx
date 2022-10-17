import { useListContext } from '#components/List/Provider'
import { makeSomeAdjacentPages } from './utils'
import cn from 'classnames'
import { CaretRight, CaretLeft } from 'phosphor-react'

interface Props {
  className: string
  activeClass: string
}

export const Pagination = ({
  className,
  activeClass
}: Props): JSX.Element | null => {
  const {
    state: { currentPage, list },
    changePage
  } = useListContext()

  if (list == null) {
    return null
  }

  const isRefetching = currentPage !== list.meta.currentPage
  const nextPages = makeSomeAdjacentPages({
    currentPage,
    adjacentPagesCount: 3,
    pageCount: list.meta.pageCount,
    direction: 'forward'
  })
  const prevPages = makeSomeAdjacentPages({
    currentPage,
    adjacentPagesCount: 3,
    pageCount: list.meta.pageCount,
    direction: 'backward',
    excludeCurrentPage: true
  })

  // hide pagination if is only 1 page
  if (nextPages.length === 1 && currentPage === 1) {
    return null
  }

  return (
    <div
      className={cn([
        'flex gap-2',
        {
          'opacity-40 pointer-events-none touch-none': isRefetching
        }
      ])}
    >
      {currentPage > 1 ? (
        <button
          data-test-id='pagination-btn-back'
          className={className}
          onClick={() => changePage(currentPage - 1)}
        >
          <CaretLeft />
        </button>
      ) : null}
      {prevPages.map((p) => (
        <button
          key={p}
          data-test-id='pagination-btn'
          className={className}
          onClick={() => changePage(p)}
        >
          {p}
        </button>
      ))}
      {nextPages.map((p) => {
        const isCurrentPage = p === currentPage
        return (
          <button
            key={p}
            data-test-id='pagination-btn'
            className={cn({
              [className]: true,
              [activeClass]: isCurrentPage
            })}
            onClick={isCurrentPage ? undefined : () => changePage(p)}
          >
            {p}
          </button>
        )
      })}
      {currentPage < list.meta.pageCount ? (
        <button
          data-test-id='pagination-btn-next'
          className={className}
          onClick={() => changePage(currentPage + 1)}
        >
          <CaretRight />
        </button>
      ) : null}
    </div>
  )
}
