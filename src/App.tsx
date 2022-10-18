import TokenProvider from '#components/TokenProvider'
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
        <Route path='/'>
          <ListPage />
        </Route>
        <Route path='/new'>
          <ResourceSelectorPage />
        </Route>
        <Route path='/new/:resourceType'>
          <NewImportPage />
        </Route>
        <Route path='/details/:importId'>
          <DetailsPage />
        </Route>
      </>
    </TokenProvider>
  )
}

export default App
