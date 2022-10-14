import { useListContext } from '#components/List/Provider'
import { makeCurrentPageOffsets } from './utils'

interface Props {
  className?: string
}

export const PaginationCounter = ({ className }: Props): JSX.Element | null => {
  const {
    state: { currentPage, list }
  } = useListContext()

  if (list == null) {
    return null
  }

  const { firstOfPage, lastOfPage } = makeCurrentPageOffsets({
    currentPage,
    recordCount: list.meta.recordCount,
    recordsPerPage: list.meta.recordsPerPage
  })
  return (
    <div className={className}>
      {firstOfPage}-{lastOfPage} of {list.meta.recordCount}
    </div>
  )
}
