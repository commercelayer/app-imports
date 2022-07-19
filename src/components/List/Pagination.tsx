import { useListContext } from "#components/List/Provider"

export const Pagination = () => {
  const {
    state: { currentPage, list },
    changePage,
  } = useListContext()

  const onPrevClick = () => changePage(currentPage - 1)
  const onNextClick = () => changePage(currentPage + 1)

  if (!list) {
    return null
  }

  return (
    <div>
      <div className="py-4">page: {list.meta.currentPage}</div>
      <div className="flex gap-2">
        {currentPage > 1 ? (
          <button className="btn" onClick={onPrevClick}>
            prev
          </button>
        ) : null}
        {currentPage < list.meta.pageCount ? (
          <button className="btn" onClick={onNextClick}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  )
}
