import axios from 'axios';
import { toast } from 'sonner';

// Create Axios Instance
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Setup Interceptors for Clerk Token Integration
export const setupApiInterceptors = (getToken: () => Promise<string | null>) => {

    // Request Interceptor
    api.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 401) {
                    toast.error("Session expired or unauthorized. Please sign in again.");
                    // Redirection could be handled via window.location if not using Next router/React Router redirect natively
                } else if (status === 500) {
                    toast.error(data?.error || "An unexpected server error occurred.");
                } else {
                    toast.error(data?.error || "An error occurred.");
                }
            } else if (error.request) {
                console.error("Axios Request Error:", error);
                toast.error(`Network error (${error.message || 'unknown'}). Could not connect to the server.`);
            } else {
                console.error("Axios General Error:", error);
                toast.error(`Error: ${error.message || 'Failed to setup request'}`);
            }

            return Promise.reject(error);
        }
    );
};
