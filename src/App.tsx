import { ErrorBoundary } from '#components/ErrorBoundary'
import { ErrorNotFound } from '#components/ErrorNotFound'
import TokenProvider from '#components/TokenProvider'
import { appRoutes } from '#data/routes'
import { Route, Switch } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'
import { ResourceSelectorPage } from './pages/ResourceSelectorPage'

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <TokenProvider
        currentApp='imports'
        clientKind='integration'
        domain={import.meta.env.PUBLIC_DOMAIN}
        onInvalidAuth={({ reason }) => {
          console.log('invalid callback received: ', reason)
        }}
      >
        <Switch>
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
          <Route>
            <ErrorNotFound />
          </Route>
        </Switch>
      </TokenProvider>
    </ErrorBoundary>
  )
}

export default App
