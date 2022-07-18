import { Settings } from "App"
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

import { getAccessTokenFromUrl } from "#utils/getAccessTokenFromUrl"
import { getInfoFromJwt } from "#utils/getInfoFromJwt"

type SettingsProviderValue = {
  settings: Settings
  isLoading: boolean
}

type SettingsProviderProps = {
  children: ((props: SettingsProviderValue) => ReactNode) | ReactNode
}

const initialValues: SettingsProviderValue = {
  settings: {
    accessToken: "",
    organization: "",
  },
  isLoading: true,
}

export const SettingsContext = createContext<SettingsProviderValue>(initialValues)

export const useSettings = (): SettingsProviderValue => {
  const ctx = useContext(SettingsContext)
  return {
    settings: ctx.settings,
    isLoading: !!ctx.isLoading,
  }
}

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialValues.settings)
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = getAccessTokenFromUrl()

  useEffect(() => {
    if (!accessToken) {
      return
    }
    const { slug } = getInfoFromJwt(accessToken)
    slug &&
      setSettings({
        accessToken,
        organization: slug,
      })
    setIsLoading(false)
  }, [accessToken])

  const value = { settings, isLoading }
  return (
    <SettingsContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SettingsContext.Provider>
  )
}
