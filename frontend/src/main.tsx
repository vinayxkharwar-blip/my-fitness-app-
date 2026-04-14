import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { validateEnv } from "./lib/env";
import { ClerkProvider, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { setupApiInterceptors } from "./lib/api";
import { useEffect } from "react";

// Validate envs
try {
    validateEnv();
} catch (error) {
    console.error("Startup validation failed:", error);
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

// Component to hook Clerk's getToken into our Axios instance
function ApiInterceptorProvider() {
    const { getToken } = useClerkAuth();

    useEffect(() => {
        setupApiInterceptors(getToken);
    }, [getToken]);

    return null;
}

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <ApiInterceptorProvider />
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                    <Toaster position="top-right" richColors />
                </AuthProvider>
            </QueryClientProvider>
        </ClerkProvider>
    </ErrorBoundary>
);
