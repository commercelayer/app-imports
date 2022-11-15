import { useTokenProvider } from '#components/TokenProvider'
import { appRoutes } from '#data/routes'
import { Button } from '#ui/Button'
import { Link, useLocation } from 'wouter'
import { ListImportProvider } from '#components/List/Provider'
import { EmptyState } from '#components/ui/EmptyState'
import { getUiStatus } from '#components/List/utils'
import { TotalCount } from '#components/List/TotalCount'
import { ListTask } from '#components/ui/ListTask'
import { ListTaskItem } from '#components/ui/ListTaskItem'
import { getProgressPercentage } from '#utils/getProgressPercentage'
import { showResourceNiceName } from '#data/resources'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'
import { PageLayout } from '#components/ui/PageLayout'
import { PageSkeleton } from '#components/ui/PageSkeleton'

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
      <ListImportProvider sdkClient={sdkClient} pageSize={10}>
        {({ state, changePage, deleteImport }) => {
          const { isLoading, currentPage, list } = state

          if (isLoading) {
            return <ListTask isLoading />
          }

          if (list == null) {
            return <div>Error</div>
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
            <ListTask
              isDisabled={isRefetching}
              title={
                <div>
                  All imports · <TotalCount />
                </div>
              }
              actionButton={
                <Link href={appRoutes.selectResource.makePath()}>
                  <Button variant='link' className='text-primary'>
                    New import
                  </Button>
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
                  <ListTaskItem
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
            </ListTask>
          )
        }}
      </ListImportProvider>
    </PageLayout>
  )
}

export default ListPage
