import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"

import { Nav } from "#components/Nav"
import { SettingsProvider } from "#components/SettingsProvider"
import "#styles/globals.css"
import "#components/i18n"

function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <SettingsProvider>
          {({ isLoading, settings }) =>
            isLoading ? (
              <div>Reading settings...</div>
            ) : settings ? (
              <div>
                <Component {...pageProps} />
                <Nav />
              </div>
            ) : (
              <div>Invalid</div>
            )
          }
        </SettingsProvider>
      )}
    </div>
  )
}

export default appWithTranslation(App)
