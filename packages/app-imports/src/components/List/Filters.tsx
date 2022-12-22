import { FC } from 'react'

import { useListContext } from '#components/List/Provider'

export const SampleFilters: FC = () => {
  const { updateFilter } = useListContext()

  return (
    <div>
      <button
        onClick={() => {
          updateFilter({
            type: 'filterStatus',
            payload: 'completed'
          })
        }}
      >
        view completed only
      </button>
      <button
        onClick={() => {
          updateFilter({
            type: 'filterStatus',
            payload: 'in_progress'
          })
        }}
      >
        view pending only
      </button>
      <button
        onClick={() => {
          updateFilter({
            type: 'filterStatus',
            payload: 'all'
          })
        }}
      >
        view all statuses
      </button>
      <button
        onClick={() => {
          updateFilter({
            type: 'filterResourceType',
            payload: 'skus'
          })
        }}
      >
        view skus resource only
      </button>
      <button
        onClick={() => {
          updateFilter({
            type: 'filterResourceType',
            payload: 'prices'
          })
        }}
      >
        view prices resource only
      </button>
      <button
        onClick={() => {
          updateFilter({
            type: 'filterResourceType',
            payload: 'all'
          })
        }}
      >
        view all resource types
      </button>
    </div>
  )
}
