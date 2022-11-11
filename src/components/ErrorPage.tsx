import { appRoutes } from '#data/routes'
import { Link, useLocation } from 'wouter'
import { Button } from './ui/Button'
import { EmptyState } from './ui/EmptyState'
import { PageLayout } from './ui/PageLayout'

export function ErrorPage(): JSX.Element {
  const [_, setLocation] = useLocation()

  return (
    <PageLayout
      title='Imports'
      onGoBack={() => {
        setLocation(appRoutes.list.makePath())
      }}
    >
      <EmptyState
        title='Not found'
        description='We could not find the resource you are looking for.'
        action={
          <Link href={appRoutes.list.makePath()}>
            <Button variant='primary'>Go back</Button>
          </Link>
        }
      />
    </PageLayout>
  )
}
