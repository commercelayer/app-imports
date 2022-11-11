import { ListTask, ListTaskProps } from './ListTask'
import { render, RenderResult } from '@testing-library/react'

type SetupResult = RenderResult & {
  element: HTMLElement
}

const setup = (props: ListTaskProps): SetupResult => {
  const utils = render(<ListTask data-test-id='my-task-list' {...props} />)
  const element = utils.getByTestId('my-task-list')
  return {
    element,
    ...utils
  }
}

describe('ListTask', () => {
  test('Should be rendered', () => {
    const { element, getByTestId } = setup({})
    expect(element).toBeInTheDocument()
    expect(getByTestId('my-task-list')).toBeInTheDocument()
  })

  test('Should  render a title', () => {
    const title = 'This is a title'
    const { element, getByText } = setup({
      title
    })
    expect(element).toBeInTheDocument()
    expect(getByText(title)).toBeInTheDocument()
    expect(getByText(title).tagName).toBe('H2')
  })
})
