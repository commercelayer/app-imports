import { Component, ErrorInfo, ReactNode } from 'react'
import { EmptyState } from './ui/EmptyState'

interface Props {
  children?: ReactNode
  errorTitle?: string
  errorDescription?: string
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <EmptyState
          title={this.props.errorTitle ?? 'Something went wrong'}
          description={
            this.props.errorDescription ??
            'Try to reload the page and start again'
          }
        />
      )
    }

    return this.props.children
  }
}
