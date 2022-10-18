import cn from 'classnames'

export interface PageHeadingProps {
  /**
   * Main page title
   */
  title: string
  /**
   * A short text that helps to describe the page
   */
  description?: string
  /**
   * Optional callback that will be called when "go back" button is pressed
   * If missing, the "go back" button will not be shown
   */
  onGoBack?: () => void
  /**
   * If `true` removes element vertical paddings
   */
  noGap?: boolean
}

export function PageHeading({
  noGap = false,
  onGoBack,
  title,
  description,
  ...rest
}: PageHeadingProps): JSX.Element {
  return (
    <div className={cn({ 'pt-10 pb-14': !noGap })} {...rest}>
      {onGoBack != null ? (
        <button onClick={onGoBack}>
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
