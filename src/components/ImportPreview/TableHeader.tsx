export function TableHeader({ value }: { value: string }): JSX.Element {
  return (
    <th className='text-xs uppercase p-4 bg-gray-50 text-gray-400 text-left'>
      {value}
    </th>
  )
}
