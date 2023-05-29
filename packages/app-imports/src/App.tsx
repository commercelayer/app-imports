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
  PageSkeleton,
  CoreSdkProvider
} from '@commercelayer/app-elements'

const isDev = Boolean(import.meta.env.DEV)

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <ErrorBoundary hasContainer>
      <TokenProvider
        appSlug='imports'
        kind='webapp'
        domain={window.clAppConfig.domain}
        reauthenticateOnInvalidAuth={!isDev}
        loadingElement={<PageSkeleton />}
        devMode
      >
        <CoreSdkProvider>
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
        </CoreSdkProvider>
      </TokenProvider>
    </ErrorBoundary>
  )
}

export default App
