import { CaretRight } from 'phosphor-react'

interface ListSimpleItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string
}
export function ListSimpleItem({
  label,
  ...rest
}: ListSimpleItemProps): JSX.Element {
  return (
    <a
      {...rest}
      className='flex justify-between px-5 py-5 border-b border-gray-100 text-gray-800 font-semibold hover:opacity-70 '
    >
      {label}
      <CaretRight />
    </a>
  )
}
