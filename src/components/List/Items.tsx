import { appRoutes } from '#data/routes'
import { useLocation } from 'wouter'
import { ItemJob } from './ItemJob'
import { useListContext } from './Provider'
import cn from 'classnames'

export function Items(): JSX.Element | null {
  const {
    state: { currentPage, list },
    deleteImport
  } = useListContext()

  const setLocation = useLocation()[1]

  if (list == null) {
    return null
  }

  const isRefetching = currentPage !== list.meta.currentPage

  return (
    <div
      className={cn({
        'opacity-40 pointer-events-none touch-none': isRefetching
      })}
    >
      {list.map((job) => (
        <ItemJob
          key={job.id}
          job={job}
          onDeleteRequest={deleteImport}
          onShowRequest={(id) => {
            setLocation(appRoutes.details(id))
          }}
        />
      ))}
    </div>
  )
}
