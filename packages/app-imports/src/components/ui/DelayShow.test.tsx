import { DelayShow } from './DelayShow'
import { render, RenderResult } from '@testing-library/react'

interface SetupProps {
  delayMs: number
}

type SetupResult = RenderResult & {
  element: HTMLElement
}

const setup = ({ delayMs }: SetupProps): SetupResult => {
  const utils = render(
    <DelayShow delayMs={delayMs}>
      <div>Hello, I am some delayed content</div>
    </DelayShow>
  )
  return {
    element: utils.getByTestId('delay-show'),
    ...utils
  }
}

describe('DelayShow', () => {
  test('Should render', async () => {
    const { element } = setup({ delayMs: 500 })
    expect(element).toBeInTheDocument()
  })
})
