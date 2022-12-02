import { RuntimeConfigProvider } from '#components/RuntimeConfigProvider'
import { ErrorBoundary } from '#components/ErrorBoundary'
import { ErrorNotFound } from '#components/ErrorNotFound'
import TokenProvider from '#components/TokenProvider'
import { PageSkeleton } from '#components/ui/PageSkeleton'
import { appRoutes } from '#data/routes'
import { Router, Route, Switch } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'
import { ResourceSelectorPage } from './pages/ResourceSelectorPage'

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

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
