import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@commercelayer/app-elements/style.css'

// init mswjs mock service worker
if (import.meta.env.PUBLIC_ENABLE_MOCKS === 'true' && import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  void worker.start({
    onUnhandledRequest: 'bypass'
  })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
