import { isFalsy } from '#utils/isFalsy'
import { AllowedParentResource } from 'App'
import { useState, useEffect } from 'react'

import { useResourceSelectorContext } from './Provider'

interface Props {
  parentResource: AllowedParentResource
  label: string
}

export default function SearchInput ({ parentResource, label }: Props): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const { search, reset } = useResourceSelectorContext()

  useEffect(() => {
    if (isFalsy(parentResource)) {
      return
    }
    if (inputValue !== '' && inputValue.length > 3) {
      reset()
      search(inputValue, parentResource)
    }
  }, [inputValue])

  return (
    <div>
      <label>{label}</label>
      <input
        className='border rounded w-30 py-2 px-3'
        value={inputValue}
        onChange={({ currentTarget }) => setInputValue(currentTarget.value)}
      />
    </div>
  )
}
