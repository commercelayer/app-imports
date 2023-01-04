import { RuntimeConfigProvider } from '#components/RuntimeConfigProvider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import { Router, Route, Switch } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'
import { ResourceSelectorPage } from './pages/ResourceSelectorPage'
import {
  ErrorBoundary,
  TokenProvider,
  PageSkeleton
} from '@commercelayer/core-app-elements'

function App(): JSX.Element {
  const version = window.location.pathname.match(
    /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[\w]+\.(0|[1-9]\d*))*/
  )
  const basePath =
    import.meta.env.PUBLIC_FOLDER != null
      ? `/${import.meta.env.PUBLIC_FOLDER}${
          version != null ? `/${version[0]}` : ''
        }`
      : '/'

  return (
    <ErrorBoundary hasContainer>
      <RuntimeConfigProvider>
        {({ domain }) => (
          <TokenProvider
            currentApp='imports'
            clientKind='integration'
            domain={domain ?? ''}
            onInvalidAuth={({ reason }) => {
              console.error('invalid callback received: ', reason)
            }}
            loadingElement={<PageSkeleton />}
            devMode
          >
            <Router base={basePath}>
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
            </Router>
          </TokenProvider>
        )}
      </RuntimeConfigProvider>
    </ErrorBoundary>
  )
}

export default App
