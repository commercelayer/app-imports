import {
  CoreSdkProvider,
  ErrorBoundary,
  MetaTags,
  TokenProvider,
  createApp
} from '@commercelayer/app-elements'
import '@commercelayer/app-elements/style.css'
import { StrictMode } from 'react'
import { App } from './App'

const isDev = Boolean(import.meta.env.DEV)

createApp(
  (props) => (
    <StrictMode>
      <ErrorBoundary hasContainer>
        <TokenProvider
          kind='imports'
          appSlug='imports'
          devMode={isDev}
          reauthenticateOnInvalidAuth={!isDev && props?.onInvalidAuth == null}
          loadingElement={<div />}
          {...props}
        >
          <CoreSdkProvider>
            <MetaTags />
            <App routerBase={props?.routerBase} />
          </CoreSdkProvider>
        </TokenProvider>
      </ErrorBoundary>
    </StrictMode>
  ),
  'imports'
)
