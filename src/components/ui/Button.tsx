import { ReactNode } from 'react'
import cn from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link'
type ButtonSize = 'small' | 'regular' | 'large'

const sizeCss: Record<ButtonSize, string> = {
  small: 'px-6 py-2',
  regular: 'px-6 py-3',
  large: 'px-8 py-4'
}

const variantCss: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:opacity-80',
  secondary:
    'bg-white border border-gray-300 text-black hover:opacity-80 hover:bg-gray-50',
  danger:
    'bg-white border border-red-400 text-red-400 hover:opacity-80 hover:bg-gray-50',
  link: 'border border-transparent hover:opacity-80'
}

export function Button({
  children,
  className,
  size = 'regular',
  variant = 'primary',
  disabled,
  ...rest
}: Props): JSX.Element {
  return (
    <button
      className={cn([
        className,
        'text-sm leading-none rounded text-center font-semibold transition-bg duration-500 focus:outline-none',
        { 'opacity-50 pointer-events-none touch-none': disabled },
        sizeCss[size],
        variantCss[variant]
      ])}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
