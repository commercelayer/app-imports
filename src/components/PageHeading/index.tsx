import cn from 'classnames'

interface Props {
  onGoBack?: () => void
  title: string
  description?: string
  gap?: boolean
}

export function PageHeading({
  gap,
  onGoBack,
  title,
  description
}: Props): JSX.Element {
  return (
    <div className={cn({ 'pt-10 pb-14': gap })}>
      {onGoBack != null ? (
        <button>
          <svg
            width='32'
            height='32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M27 16H5M14 7l-9 9 9 9'
              stroke='currentColor'
              strokeWidth='2'
            />
          </svg>
        </button>
      ) : null}
      <h1 className='text-lg'>{title}</h1>
      {description !== null && <p className='text-gray-500'>{description}</p>}
    </div>
  )
}
