import { isEmpty } from 'lodash-es'

export function TableCell({ value }: { value?: string | object }): JSX.Element {
  const isString = typeof value === 'string' || typeof value === 'number'
  return (
    <td className='p-4'>
      <div
        title={isString && value.length > 20 ? value : undefined}
        className='text-sm w-28 h-6 overflow-hidden text-ellipsis whitespace-nowrap'
      >
        {isString ? value : isEmpty(value) ? '-' : '{...}'}
      </div>
    </td>
  )
}
