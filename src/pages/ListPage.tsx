import { Items } from '#components/List/Items'
import { Pagination } from '#components/List/Pagination'
import { PaginationCounter } from '#components/List/PaginationCounter'
import { TotalCount } from '#components/List/TotalCount'
import { PageHeading } from '#components/PageHeading'
import { useTokenProvider } from '#components/TokenProvider'
import { Container } from '#ui/Container'
import { appRoutes } from '#data/routes'
import { Button } from '#ui/Button'
import { Link } from 'wouter'
import { ListImportProvider } from '#components/List/Provider'
import { EmptyState } from '#components/ui/EmptyState'

function ListPage(): JSX.Element {
  const { sdkClient, dashboardUrl } = useTokenProvider()

  if (sdkClient == null) {
    return <div>Waiting for sdk client</div>
  }

  return (
    <Container>
      <PageHeading
        title='Imports'
        onGoBack={() => {
          window.location.href = dashboardUrl != null ? dashboardUrl : '/'
        }}
      />

      <ListImportProvider sdkClient={sdkClient} pageSize={8}>
        {({ state }) => {
          const { isLoading, list } = state

          if (isLoading && list == null) {
            return <div />
          }

          if (list == null) {
            return null
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

          return (
            <div className='flex flex-col flex-1'>
              <div className='flex justify-between pb-4 border-b border-gray-100'>
                <div className='text-gray-500'>
                  All imports · <TotalCount />
                </div>
                <Link href={appRoutes.selectResource.makePath()}>
                  <Button variant='link' className='text-primary'>
                    Add new
                  </Button>
                </Link>
              </div>
              <Items />
              <div className='flex mt-auto items-center justify-between py-9'>
                <PaginationCounter className='text-gray-500 font-medium' />
                <Pagination
                  className='border border-gray-500 text text-sm rounded-sm w-10 h-10 flex items-center justify-center'
                  activeClass='border-2 border-black text-black font-bold'
                />
              </div>
            </div>
          )
        }}
      </ListImportProvider>
    </Container>
  )
}

export default ListPage
