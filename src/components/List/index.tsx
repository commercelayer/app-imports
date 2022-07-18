import cn from "classnames"
import { FC } from "react"

import { ListImportProvider, useListContext } from "./Provider"

import { useSettings } from "#components/SettingsProvider"

export const List: FC = () => {
  const { settings } = useSettings()

  if (!settings) {
    return <div>Loading</div>
  }

  return (
    <ListImportProvider
      accessToken={settings.accessToken}
      organization={settings.organization}
      pageSize={25}
      polling={false}
    >
      <ListInner />
    </ListImportProvider>
  )
}

const ListInner: FC = () => {
  const {
    state: { isLoading, currentPage, list },
    changePage,
    updateFilter,
  } = useListContext()

  const onPrevClick = () => changePage(currentPage - 1)
  const onNextClick = () => changePage(currentPage + 1)

  const isRefetching = list?.meta && currentPage !== list.meta.currentPage

  if (isLoading && !list) {
    return <div>Loading list...</div>
  }

  if (!list) {
    return null
  }

  return (
    <div className={cn("container", { "opacity-40": isRefetching })}>
      <div>
        <button
          className="btn"
          onClick={() => {
            updateFilter({
              type: "filterStatus",
              payload: "completed",
            })
          }}
        >
          view completed only
        </button>
        <button
          className="btn"
          onClick={() => {
            updateFilter({
              type: "filterStatus",
              payload: "all",
            })
          }}
        >
          view all
        </button>
        <button
          className="btn"
          onClick={() => {
            updateFilter({
              type: "filterResourceType",
              payload: "skus",
            })
          }}
        >
          view skus resource only
        </button>
        <button
          className="btn"
          onClick={() => {
            updateFilter({
              type: "filterResourceType",
              payload: "all",
            })
          }}
        >
          view all resource
        </button>
      </div>
      {list.map((item) => (
        <div key={item.id}>
          {item.id} - {item.status} - {item.resource_type}
        </div>
      ))}
      <div className="py-4">page: {list.meta.currentPage}</div>
      <div className="flex gap-2">
        {currentPage > 1 ? (
          <button className="btn" onClick={onPrevClick}>
            prev
          </button>
        ) : null}
        {currentPage < list.meta.pageCount ? (
          <button className="btn" onClick={onNextClick}>
            Next
          </button>
        ) : null}
      </div>
    </div>
  )
}
