interface Props {
  children: React.ReactNode
}

export function Container({ children, ...rest }: Props): JSX.Element {
  return (
    <div
      className='container mx-auto min-h-screen flex flex-col px-4 md:px-0'
      {...rest}
    >
      {children}
    </div>
  )
}
