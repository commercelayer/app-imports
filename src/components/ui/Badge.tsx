import cn from 'classnames'
import React from 'react'

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'success'

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  variant: BadgeVariant
  label: string
}

const variantCss: Record<BadgeVariant, string> = {
  primary: 'text-primary bg-primary/10',
  secondary: 'text-gray-500 bg-gray-500/10',
  warning: 'text-orange-400 bg-orange-400/10',
  danger: 'text-red-400 bg-red-400/10',
  success: 'text-green-400 bg-green-400/10'
}

export function Badge({
  variant,
  label,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <div
      {...rest}
      className={cn([
        className,
        'text-sm font-bold leading-none py-1 px-2 rounded-md',
        variantCss[variant]
      ])}
    >
      {label}
    </div>
  )
}
