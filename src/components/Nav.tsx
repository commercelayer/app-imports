import Link from "next/link"
import { FC } from "react"

import { availableResources } from "#data/resources"
import { appRoutes } from "#data/routes"

export const Nav: FC = () => {
  return (
    <div className="flex gap-2">
      <Link href={appRoutes.list()} passHref>
        <a className="btn">List</a>
      </Link>
      {availableResources.map((resource) => (
        <Link key={resource} href={appRoutes.new(resource)} passHref>
          <a className="btn">Import new {resource.toString()}</a>
        </Link>
      ))}
    </div>
  )
}
