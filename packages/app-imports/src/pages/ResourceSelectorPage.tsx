import { appRoutes } from '#data/routes'
import { useLocation, Link } from 'wouter'
import { availableResources, showResourceNiceName } from '#data/resources'
import {
  List,
  ListItem,
  PageLayout,
  Spacer,
  useTokenProvider
} from '@commercelayer/app-elements'

export function ResourceSelectorPage(): JSX.Element {
  const {
    settings: { mode }
  } = useTokenProvider()
  const [_, setLocation] = useLocation()

  return (
    <PageLayout
      title='Select type'
      mode={mode}
      onGoBack={() => {
        setLocation(appRoutes.list.makePath())
      }}
    >
      <Spacer bottom='12'>
        <List>
          {availableResources.sort().map((resource) => (
            <Link key={resource} href={appRoutes.newImport.makePath(resource)}>
              <ListItem label={showResourceNiceName(resource)} />
            </Link>
          ))}
        </List>
      </Spacer>
    </PageLayout>
  )
}
