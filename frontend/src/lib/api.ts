import axios from 'axios';
import { toast } from 'sonner';

/**
 * Safely resolves the API Base URL:
 * - If VITE_API_URL is defined, use it (stripping any trailing slash).
 * - In development mode, fallback to "http://localhost:5000".
 * - In production mode without VITE_API_URL, default to "" (relative path) to avoid 
 *   invalid localhost calls on mobile or remote client devices.
 */
export const getApiBaseUrl = (): string => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (typeof envUrl === 'string' && envUrl.trim().length > 0) {
        return envUrl.trim().replace(/\/+$/, '');
    }
    if (import.meta.env.DEV) {
        return "http://localhost:5000";
    }
    return "";
};

// Create Axios Instance
export const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor to automatically attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                const currentPath = window.location.pathname;
                if (!["/login", "/signup", "/register"].includes(currentPath)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                }
            } else if (status === 405) {
                const isProduction = !import.meta.env.DEV;
                const msg = isProduction && !getApiBaseUrl()
                    ? "Production API route not configured (405 Method Not Allowed). Set VITE_API_URL to your deployed backend URL in Vercel Project Settings."
                    : (data?.error || "Request method not allowed.");
                toast.error(msg);
            } else if (status >= 502 && status <= 504) {
                toast.error("Backend server is temporarily unreachable or spinning up (Render cold start). Please wait ~30 seconds and retry.");
            } else if (status === 500) {
                toast.error(data?.error || "An unexpected server error occurred.");
            } else {
                toast.error(data?.error || "An error occurred.");
            }
        } else if (error.request) {
            console.error("Axios Request Error:", error);
            const baseUrl = getApiBaseUrl();
            const msg = !baseUrl && !import.meta.env.DEV
                ? "Could not reach backend. In production, configure VITE_API_URL in your Vercel Project Settings."
                : `Network error (${error.message || 'unknown'}). Could not connect to the server.`;
            toast.error(msg);
        } else {
            console.error("Axios General Error:", error);
            toast.error(`Error: ${error.message || 'Failed to setup request'}`);
        }

        return Promise.reject(error);
    }
);
