import { Nav } from '#components/Nav'
import { SettingsProvider } from '#components/SettingsProvider'
import { Route } from 'wouter'
import DetailsPage from './pages/DetailsPage'
import ListPage from './pages/ListPage'
import NewImportPage from './pages/NewImportPage'

function App (): JSX.Element {
  return (
    <SettingsProvider>
      {({ isLoading }) =>
        isLoading
          ? (
            <div>Loading...</div>
            )
          : (
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
            )}
    </SettingsProvider>
  )
}

export default App
