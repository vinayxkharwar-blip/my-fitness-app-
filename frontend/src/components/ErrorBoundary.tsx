import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-red-500">Oops, something went wrong.</h1>
                    <p className="text-muted-foreground mb-8 text-lg">
                        {this.state.error?.message || "An unexpected error occurred while rendering this page."}
                    </p>
                    <button
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        onClick={() => window.location.href = '/'}
                    >
                        Return Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
