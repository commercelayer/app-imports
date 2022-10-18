import TokenProvider from '#components/TokenProvider'
import { appRoutes } from '#data/routes'
import { Route } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'
import { ResourceSelectorPage } from './pages/ResourceSelectorPage'

function App(): JSX.Element {
  return (
    <TokenProvider
      currentApp='imports'
      clientKind='integration'
      domain={import.meta.env.PUBLIC_DOMAIN}
      onInvalidAuth={({ reason }) => {
        console.log('invalid callback received: ', reason)
      }}
    >
      <>
        <Route path={appRoutes.list.path}>
          <ListPage />
        </Route>
        <Route path={appRoutes.selectResource.path}>
          <ResourceSelectorPage />
        </Route>
        <Route path={appRoutes.newImport.path}>
          <NewImportPage />
        </Route>
        <Route path={appRoutes.details.path}>
          <DetailsPage />
        </Route>
      </>
    </TokenProvider>
  )
}

export default App
