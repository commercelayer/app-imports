import { FC } from 'react'

import { availableResources } from '#data/resources'
import { appRoutes } from '#data/routes'
import { Link } from 'wouter'

export const Nav: FC = () => {
  return (
    <div className='flex gap-2'>
      <Link href={appRoutes.list()}>
        <a className='btn'>List</a>
      </Link>
      {availableResources.map((resource) => (
        <Link key={resource} href={appRoutes.new(resource)}>
          <a className='btn'>Import new {resource.toString()}</a>
        </Link>
      ))}
    </div>
  )
}
