import { InputAutosuggest } from './InputAutosuggest'
import { fireEvent, render, RenderResult } from '@testing-library/react'

type SetupResult = RenderResult & {
  element: HTMLElement
}

const setup = (): SetupResult => {
  const utils = render(
    <InputAutosuggest
      data-test-id='autosuggest'
      onSelect={() => undefined}
      initialValue='foobar'
      searchFunction={async () => {
        return [{ id: 'abc', label: 'Commerce Layer' }]
      }}
    />
  )
  const element = utils.getByTestId('autosuggest')
  return {
    element,
    ...utils
  }
}

describe('InputAutosuggest', () => {
  test('Should be rendered', () => {
    const { element } = setup()
    expect(element.querySelector('input')).toBeInTheDocument()
    expect(element.querySelector('input')?.value).toBe('foobar')
  })

  test('Should update input value', () => {
    const { element } = setup()
    const input = element.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'commercelayer' } })
    expect(element.querySelector('input')?.value).toBe('commercelayer')
  })
})
