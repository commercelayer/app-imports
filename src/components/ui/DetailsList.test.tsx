import { DetailsList, DetailsListProps } from './DetailsList'
import { getAllByTestId, render, RenderResult } from '@testing-library/react'

interface SetupProps extends Omit<DetailsListProps, 'children'> {
  id: string
}

type SetupResult = RenderResult & {
  element: HTMLElement
}

const setup = ({ id, ...rest }: SetupProps): SetupResult => {
  const utils = render(
    <DetailsList data-test-id={id} {...rest}>
      <div>Row 1</div>
      <div>Row 2</div>
      <div>Row 3</div>
    </DetailsList>
  )
  const element = utils.getByTestId(id)
  return {
    element,
    ...utils
  }
}

describe('DetailsList', () => {
  test('Should render title and children', () => {
    const { element, getByTestId } = setup({
      id: 'my-details-list',
      title: 'Details'
    })
    expect(element).toBeVisible()
    expect(getByTestId('details-list-title').innerHTML).toBe('Details')
    const rows = element.querySelector(
      "[data-test-id='details-list-rows']"
    )?.childNodes
    expect(rows?.length).toBe(3)
  })

  test('Should display `isLoading` state with the specified number of `loadingLines`', () => {
    const { element } = setup({
      id: 'my-details-list',
      title: 'Details',
      isLoading: true,
      loadingLines: 2
    })
    expect(element).toBeVisible()
    const rows = element.querySelector(
      "[data-test-id='details-list-rows']"
    )?.childNodes
    expect(rows?.length).toBe(2)
  })
})
