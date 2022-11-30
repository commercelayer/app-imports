import { createContext, ReactNode, useEffect, useState } from 'react'

interface RuntimeConfigContextValue {
  domain?: string
}

const RuntimeConfigContext = createContext<RuntimeConfigContextValue>({
  domain: undefined
})

interface RuntimeConfigProviderProps {
  children: ((props: RuntimeConfigContextValue) => ReactNode) | ReactNode
}

export function RuntimeConfigProvider({
  children
}: RuntimeConfigProviderProps): JSX.Element | null {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<RuntimeConfigContextValue>({})

  useEffect(() => {
    fetch('/config.json')
      .then(async (r) => await r.json())
      .then((cfg) => {
        setValue({
          domain: parseFlatJsonValue(cfg.domain)
        })
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <RuntimeConfigContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </RuntimeConfigContext.Provider>
  )
}

function parseFlatJsonValue(value: any): string | undefined {
  return typeof value === 'string' ? value : undefined
}
