import cn from 'classnames'
import { ReactNode } from 'react'

export type TextVariant = 'danger' | 'success' | 'primary' | 'plain'

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode
  variant?: TextVariant
  tag?: 'div' | 'span'
}

export function Text({
  children,
  className,
  variant,
  tag = 'span',
  ...rest
}: TextProps): JSX.Element {
  const computedClassName = cn(className, {
    'text-green-400': variant === 'success',
    'text-red-400': variant === 'danger',
    'text-primary': variant === 'primary'
  })
  return tag === 'span' ? (
    <span {...rest} className={computedClassName}>
      {children}
    </span>
  ) : (
    <div {...rest} className={computedClassName}>
      {children}
    </div>
  )
}
