'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-[200px] bg-red-50 rounded-lg">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
            <p className="mt-2 text-sm text-red-500">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 