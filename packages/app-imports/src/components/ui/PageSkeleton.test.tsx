import { PageSkeleton } from './PageSkeleton'
import { render } from '@testing-library/react'

describe('PageSkeleton', () => {
  test('Should be rendered', () => {
    const { getByTestId } = render(<PageSkeleton />)
    const element = getByTestId('page-skeleton')
    expect(element).toBeVisible()
    expect(
      element.querySelector('loading-header-description')
    ).not.toBeInTheDocument()
  })

  test('Should have skeleton for header description ', () => {
    const { getByTestId } = render(<PageSkeleton hasHeaderDescription />)
    expect(getByTestId('loading-header-description')).toBeVisible()
  })

  test('Should render a skeleton for list page', () => {
    const { getByTestId } = render(<PageSkeleton layout='list' />)
    expect(getByTestId('page-skeleton')).toBeVisible()
    expect(getByTestId('loading-list')).toBeVisible()
  })

  test('Should render a skeleton for list page', () => {
    const { getByTestId } = render(<PageSkeleton layout='details' />)
    expect(getByTestId('page-skeleton')).toBeVisible()
    expect(getByTestId('loading-details')).toBeVisible()
  })
})
