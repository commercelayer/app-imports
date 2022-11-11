import { appRoutes } from '#data/routes'
import { useLocation, Link } from 'wouter'
import { availableResources, showResourceNiceName } from '#data/resources'
import { PageLayout } from '#components/ui/PageLayout'
import { ListSimple } from '#components/ui/ListSimple'
import { ListSimpleItem } from '#components/ui/ListSimpleItem'

export function ResourceSelectorPage(): JSX.Element {
  const [_, setLocation] = useLocation()

  return (
    <PageLayout
      title='Select type'
      onGoBack={() => {
        setLocation(appRoutes.list.makePath())
      }}
    >
      <ListSimple>
        {availableResources.sort().map((resource) => (
          <Link key={resource} href={appRoutes.newImport.makePath(resource)}>
            <ListSimpleItem label={showResourceNiceName(resource)} />
          </Link>
        ))}
      </ListSimple>
    </PageLayout>
  )
}
