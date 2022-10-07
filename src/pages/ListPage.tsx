import { ListContainer } from '#components/List/Container'
import { Items } from '#components/List/Items'
import { Pagination } from '#components/List/Pagination'
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
    <div className='container mx-auto'>
      <PageHeading
        title='Imports'
        onGoBack={() => {
          window.location.href = dashboardUrl != null ? dashboardUrl : '/'
        }}
        gap
      />
      <ListContainer sdkClient={sdkClient} pageSize={25} polling={false}>
        <div className='flex justify-between pb-4 border-b border-gray-100'>
          <div className='text-gray-500'>
            All imports · <TotalCount />
          </div>
          <Button
            data-test-id='hello'
            variant='link'
            className='text-green-400'
          >
            Add new
          </Button>
        </div>
        <Items />
        <Pagination />
      </ListContainer>
    </div>
  )
}

export default ListPage
