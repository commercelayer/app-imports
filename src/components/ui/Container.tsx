interface Props {
  children: React.ReactNode
}

export function Container({ children, ...rest }: Props): JSX.Element {
  return (
    <div className='container mx-auto min-h-screen flex flex-col' {...rest}>
      {children}
    </div>
  )
}
