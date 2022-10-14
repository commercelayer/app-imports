import { appRoutes } from '#data/routes'
import { useLocation } from 'wouter'
import { ItemJob } from './ItemJob'
import { useListContext } from './Provider'

export function Items(): JSX.Element | null {
  const {
    state: { list },
    deleteImport
  } = useListContext()

  const setLocation = useLocation()[1]

  if (list == null) {
    return null
  }

  return (
    <div>
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
