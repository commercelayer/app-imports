import { appRoutes } from '#data/routes'
import { Link, useLocation } from 'wouter'
import { PageHeading } from './PageHeading'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { EmptyState } from './ui/EmptyState'

export function ErrorPage(): JSX.Element {
  const [_, setLocation] = useLocation()

  return (
    <Container>
      <PageHeading
        title='Imports'
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
      />
      <EmptyState
        title='Not found'
        description='We could not find the resource you are looking for.'
        action={
          <Link href={appRoutes.list.makePath()}>
            <Button variant='primary'>Go back</Button>
          </Link>
        }
      />
    </Container>
  )
}
