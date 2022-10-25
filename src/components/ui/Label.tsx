import cn from 'classnames'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  gap?: boolean
}

export function Label({
  gap,
  children,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <label
      {...rest}
      className={cn('block font-semibold', className, {
        'mb-2': gap
      })}
    >
      {children}
    </label>
  )
}
