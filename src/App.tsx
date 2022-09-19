import AuthProvider from '#components/AuthProvider'
import { Nav } from '#components/Nav'
import { Route } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'

function App (): JSX.Element {
  return (
    <AuthProvider
      currentApp='imports'
      clientKind='webapp'
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
    </AuthProvider>
  )
}

export default App
