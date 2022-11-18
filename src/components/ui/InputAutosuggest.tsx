import { useRef, useState } from 'react'
import Autosuggest, {
  RenderSuggestionsContainerParams
} from 'react-autosuggest'
import { isEmpty } from 'lodash-es'

export interface Suggestion {
  /**
   * unique identifier of the suggestion item
   */
  id: string | number
  /**
   * nice name of the suggestion item
   */
  label: string
  /**
   * Optional data to be added if needed
   */
  meta?: any
}

interface Props {
  /**
   * html id for the <input> element
   */
  id?: string
  /**
   * placeholder for the <input> element
   */
  placeholder?: string
  /**
   * Initial <input> value
   */
  initialValue?: string
  /**
   * Callback fired when an item is selected from the suggestion list
   */
  onSelect: (suggestion: Suggestion | null) => void
  /**
   * A search or fetch function that will be called anytime a new value is typed. It have to return the new suggestion list
   */
  searchFunction: (hint: string) => Promise<Suggestion[]>
}

export function InputAutosuggest({
  id,
  placeholder,
  onSelect,
  searchFunction,
  initialValue = '',
  ...rest
}: Props): JSX.Element {
  const [inputValue, setInputValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputEl = useRef<HTMLInputElement | null>(null)

  const handleSearchCallback = (value: string): void => {
    if (isEmpty(value) || value.length < 3) {
      return
    }
    setIsLoading(true)
    searchFunction(value)
      .then(setSuggestions)
      .finally(() => setIsLoading(false))
  }

  const handleSuggestionSelect = (suggestion: Suggestion | null): void => {
    setSelectedSuggestion(suggestion)
    onSelect(suggestion)
  }

  return (
    <div className='relative' {...rest}>
      {selectedSuggestion != null ? (
        <div
          className='px-5 py-3 border w-full rounded cursor-pointer'
          onClick={() => {
            setSuggestions([])
            handleSuggestionSelect(null)
            setInputValue('')
            setTimeout(() => {
              inputEl.current?.focus()
            }, 100)
          }}
        >
          <span className='font-medium'>{selectedSuggestion.label}</span>{' '}
          <span className='text-gray-500'>(ID: {selectedSuggestion.id})</span>
        </div>
      ) : (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) =>
            handleSearchCallback(value)
          }
          onSuggestionsClearRequested={() => {
            setSuggestions([])
          }}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={(_event, { suggestion }) => {
            handleSuggestionSelect(suggestion)
          }}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSuggestion={renderSuggestion}
          inputProps={{
            id,
            placeholder,
            onChange: (_event, { newValue }) => {
              setInputValue(newValue)
            },
            value: inputValue,
            className: 'px-5 py-3 border w-full rounded',
            ref: inputEl
          }}
        />
      )}
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

function getSuggestionValue(suggestion: Suggestion): string {
  return suggestion.label
}

function renderSuggestionsContainer({
  containerProps,
  children
}: RenderSuggestionsContainerParams): JSX.Element | null {
  if (children == null) {
    return null
  }
  return (
    <div
      {...containerProps}
      className='border absolute w-full top-full bg-white px-5 py-3 rounded'
      data-test-id='suggestions-container'
    >
      {children}
    </div>
  )
}

function renderSuggestion(suggestion: Suggestion): JSX.Element {
  return (
    <div
      className='py-2 cursor-pointer text-sm'
      data-test-id={`suggestion-${suggestion.id}`}
    >
      {suggestion.label}
    </div>
  )
}

function LoadingSpinner(): JSX.Element {
  return (
    <div
      className='animate-spin inline-block w-6 h-6 border-4 rounded-full text-primary absolute
      top-1/2 -mt-3 right-5 pointer-events-none opa'
      role='status'
      style={{
        verticalAlign: '-.118em',
        border: '0.18em solid',
        borderRightColor: 'transparent'
      }}
    />
  )
}
