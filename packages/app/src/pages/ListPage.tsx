import { Item } from '#components/List/Item'
import { ListImportProvider } from '#components/List/Provider'
import { appRoutes } from '#data/routes'
import {
  Button,
  EmptyState,
  HomePageLayout,
  List,
  PageSkeleton,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link } from 'wouter'

function ListPage(): JSX.Element {
  const { canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()

  if (sdkClient == null) {
    return <PageSkeleton />
  }

  return (
    <HomePageLayout title='Imports'>
      <ListImportProvider sdkClient={sdkClient} pageSize={25}>
        {({ state, changePage }) => {
          const { isLoading, currentPage, list } = state

          if (isLoading) {
            return <List isLoading />
          }

          if (list == null) {
            return (
              <div>
                <EmptyState title='Unable to load list' />
              </div>
            )
          }

          if (list.length === 0) {
            return (
              <div>
                <EmptyState
                  title='No imports yet!'
                  description='Create your first import'
                  action={
                    canUser('create', 'imports') ? (
                      <Link href={appRoutes.selectResource.makePath()}>
                        <Button variant='primary'>New import</Button>
                      </Link>
                    ) : undefined
                  }
                />
              </div>
            )
          }

          const isRefetching = currentPage !== list.meta.currentPage
          const { recordCount, recordsPerPage, pageCount } = list.meta

          return (
            <List
              isDisabled={isRefetching}
              title='All Imports'
              actionButton={
                <Link href={appRoutes.selectResource.makePath()}>
                  New import
                </Link>
              }
              pagination={{
                recordsPerPage,
                recordCount,
                currentPage,
                onChangePageRequest: changePage,
                pageCount
              }}
            >
              {list.map((job) => (
                <Item key={job.id} job={job} />
              ))}
            </List>
          )
        }}
      </ListImportProvider>
    </HomePageLayout>
  )
}

export default ListPage
