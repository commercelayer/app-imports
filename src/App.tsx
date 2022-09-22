import { Nav } from '#components/Nav'
import TokenProvider from '#components/TokenProvider'
import { Route } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'

function App(): JSX.Element {
  return (
    <TokenProvider
      currentApp='imports'
      clientKind='integration'
      domain={import.meta.env.PUBLIC_DOMAIN}
      onInvalidAuth={() => {
        console.log('invalid!')
      }}
    >
      <div>
        <Route path='/'>
          <ListPage />
        </Route>
        <Route path='/new/:resourceType'>
          <NewImportPage />
        </Route>
        <Route path='/details/:importId'>
          <DetailsPage />
        </Route>
        <Nav />
      </div>
    </TokenProvider>
  )
}

export default App
