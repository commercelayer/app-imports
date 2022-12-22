import { appRoutes } from '#data/routes'
import { Link, useLocation } from 'wouter'
import { ListImportProvider } from '#components/List/Provider'
import { getUiStatus } from '#components/List/utils'
import { getProgressPercentage } from '#utils/getProgressPercentage'
import { showResourceNiceName } from '#data/resources'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'
import {
  useTokenProvider,
  PageSkeleton,
  PageLayout,
  EmptyState,
  Button,
  A,
  List,
  ListItemTask
} from '@commercelayer/core-app-elements'

function ListPage(): JSX.Element {
  const { sdkClient, dashboardUrl } = useTokenProvider()
  const [_location, setLocation] = useLocation()

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton />
  }

  return (
    <PageLayout
      title='Imports'
      onGoBack={() => {
        window.location.href = dashboardUrl != null ? dashboardUrl : '/'
      }}
    >
      <ListImportProvider sdkClient={sdkClient} pageSize={25}>
        {({ state, changePage, deleteImport }) => {
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
                    <Link href={appRoutes.selectResource.makePath()}>
                      <Button variant='primary'>New import</Button>
                    </Link>
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
                  <A>New import</A>
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
              {list.map((job) => {
                const canDelete =
                  job.status === 'pending' || job.status === 'in_progress'
                return (
                  <ListItemTask
                    key={job.id}
                    status={getUiStatus(job.status)}
                    progressPercentage={getProgressPercentage(job)?.value}
                    onClick={() => {
                      setLocation(appRoutes.details.makePath(job.id))
                    }}
                    title={showResourceNiceName(job.resource_type)}
                    onCancelRequest={
                      canDelete ? () => deleteImport(job.id) : undefined
                    }
                    description={<DescriptionLine job={job} />}
                  />
                )
              })}
            </List>
          )
        }}
      </ListImportProvider>
    </PageLayout>
  )
}

export default ListPage
