import { ListContainer } from '#components/List/Container'
import { Items } from '#components/List/Items'
import { Pagination } from '#components/List/Pagination'
import { PaginationCounter } from '#components/List/PaginationCounter'
import { TotalCount } from '#components/List/TotalCount'
import { PageHeading } from '#components/PageHeading'
import { useTokenProvider } from '#components/TokenProvider'
import { Button } from '#ui/Button'
import { useEffect } from 'react'

function ListPage(): JSX.Element {
  const { sdkClient, dashboardUrl } = useTokenProvider()

  useEffect(() => {
    if (sdkClient == null) {
      return
    }
    void sdkClient.sku_list_items.list()
  }, [sdkClient])

  if (sdkClient == null) {
    return <div>Waiting for sdk client</div>
  }

  return (
    <div className='container mx-auto min-h-screen flex flex-col'>
      <PageHeading
        title='Imports'
        onGoBack={() => {
          window.location.href = dashboardUrl != null ? dashboardUrl : '/'
        }}
        gap
      />
      <ListContainer sdkClient={sdkClient} pageSize={25} polling={false}>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between pb-4 border-b border-gray-100'>
            <div className='text-gray-500'>
              All imports · <TotalCount />
            </div>
            <Button variant='link' className='text-primary'>
              Add new
            </Button>
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
      </ListContainer>
    </div>
  )
}

export default ListPage
