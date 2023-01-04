import { PageError } from '@commercelayer/core-app-elements'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { z, ZodType } from 'zod'

interface RuntimeConfigContextValue {
  domain: string
}

const RuntimeConfigContext = createContext<RuntimeConfigContextValue | null>(
  null
)

interface RuntimeConfigProviderProps {
  children: ((props: RuntimeConfigContextValue) => ReactNode) | ReactNode
}

export function RuntimeConfigProvider({
  children
}: RuntimeConfigProviderProps): JSX.Element | null {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<RuntimeConfigContextValue | null>(null)

  useEffect(() => {
    const version = window.location.pathname.match(
      /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[\w]+\.(0|[1-9]\d*))*/
    )
    const basePath =
      import.meta.env.PUBLIC_FOLDER != null
        ? `/${import.meta.env.PUBLIC_FOLDER}${
            version != null ? `/${version[0]}` : ''
          }`
        : '/'

    fetch(`${basePath}/config.json`)
      .then(async (r) => await r.json())
      .then((cfg) => {
        setValue(parseConfig(cfg))
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return null
  }

  if ((!isLoading && value == null) || value == null) {
    return (
      <PageError
        errorName='Invalid configuration'
        errorDescription='It seems we could not find the required configuration for the current environment'
      />
    )
  }

  return (
    <RuntimeConfigContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </RuntimeConfigContext.Provider>
  )
}

function parseConfig(
  configFromJson: unknown
): RuntimeConfigContextValue | null {
  const configSchema: ZodType<RuntimeConfigContextValue> = z.object({
    domain: z.string().min(10)
  })
  try {
    return configSchema.parse(configFromJson)
  } catch (err) {
    return null
  }
}
