import { ReactNode } from 'react'

interface Props {
  label: string
  children: ReactNode
}

export function RowDetail({ label, children }: Props): JSX.Element {
  return (
    <div className='border-t last-of-type:border-b border-gray-100 py-4 px-3 flex gap-6 '>
      <div className='w-1/3 font-medium text-gray-500'>{label}</div>
      <div className='flex-1 font-semibold'>{children}</div>
    </div>
  )
}
