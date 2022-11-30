import { Container } from './Container'
import { DetailsList } from './DetailsList'
import { ListTask } from './ListTask'
import { Report } from './Report'
import { Skeleton, SkeletonItem } from './Skeleton'

interface PageSkeletonProps {
  layout?: 'list' | 'details'
  hasHeaderDescription?: boolean
}

export function PageSkeleton({
  layout,
  hasHeaderDescription
}: PageSkeletonProps): JSX.Element {
  return (
    <Container data-test-id='page-skeleton'>
      <Skeleton>
        {/* PageHeading */}
        <div className='pt-10 pb-14'>
          <div>
            <SkeletonItem className='w-8 h-8 mb-2' />
            <SkeletonItem className='w-36 h-8' />
            {hasHeaderDescription === true && (
              <SkeletonItem className='w-36 h-5 mt-2' />
            )}
          </div>
        </div>

        {layout === 'list' ? (
          <ListTask isLoading />
        ) : layout === 'details' ? (
          <>
            <Report isLoading loadingLines={2} items={[]} />
            <DetailsList title='Details' isLoading loadingLines={4} />
          </>
        ) : null}
      </Skeleton>
    </Container>
  )
}
