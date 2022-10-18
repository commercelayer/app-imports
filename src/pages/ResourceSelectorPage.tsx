import { PageHeading } from '#components/PageHeading'
import { appRoutes } from '#data/routes'
import { useLocation, Link } from 'wouter'
import { availableResources, showResourceNiceName } from '#data/resources'
import { CaretRight } from 'phosphor-react'

export function ResourceSelectorPage(): JSX.Element {
  const [_, setLocation] = useLocation()

  return (
    <div className='container mx-auto'>
      <PageHeading
        title='Select type'
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
      />
      <div className='border-t border-gray-100 mb-20'>
        {availableResources.map((resource) => (
          <Link key={resource} href={appRoutes.newImport.makePath(resource)}>
            <a className='flex justify-between px-5 py-5 border-b border-gray-100 text-gray-800 font-semibold hover:opacity-70 '>
              {showResourceNiceName(resource)}
              <CaretRight />
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
