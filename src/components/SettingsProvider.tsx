import CommerceLayer, { CommerceLayerClient } from "@commercelayer/sdk"
import { Settings } from "App"
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

import { getAccessTokenFromUrl } from "#utils/getAccessTokenFromUrl"
import { getInfoFromJwt } from "#utils/getInfoFromJwt"

type SettingsProviderValue = {
  settings: Settings
  isLoading: boolean
  sdkClient?: CommerceLayerClient
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
    sdkClient: ctx.sdkClient,
  }
}

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialValues.settings)
  const [isLoading, setIsLoading] = useState(true)
  const [sdkClient, setSdkClient] = useState<CommerceLayerClient>()
  const accessToken = getAccessTokenFromUrl()

  useEffect(() => {
    if (!accessToken) {
      return
    }
    const { slug } = getInfoFromJwt(accessToken)
    if (slug) {
      setSettings({
        accessToken,
        organization: slug,
      })
    }

    setIsLoading(false)
  }, [accessToken])

  useEffect(() => {
    if (settings?.accessToken && settings?.organization) {
      setSdkClient(
        CommerceLayer({
          accessToken: settings?.accessToken,
          organization: settings?.organization,
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        })
      )
    }
  }, [settings])

  const value = {
    settings,
    isLoading,
    sdkClient,
  }

  return (
    <SettingsContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SettingsContext.Provider>
  )
}
