import { appRoutes } from '#data/routes'
import { useLocation, Link } from 'wouter'
import { availableResources, showResourceNiceName } from '#data/resources'
import {
  List,
  ListItem,
  PageLayout,
  Spacer,
  useTokenProvider,
  Icon,
  Text
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
              <ListItem tag='a'>
                <Text weight='semibold'>{showResourceNiceName(resource)}</Text>
                <Icon name='caretRight' />
              </ListItem>
            </Link>
          ))}
        </List>
      </Spacer>
    </PageLayout>
  )
}
