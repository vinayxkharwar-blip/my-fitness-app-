import { api, getApiBaseUrl } from '@/lib/api';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const baseUrl = getApiBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${cleanEndpoint}`;
    const token = localStorage.getItem("token");
    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};

export const chatWithCoach = async (message: string) => {
    const response = await api.post("/api/chat", { message });
    return response.data;
};

export const analyzeMeal = async (imageBase64: string) => {
    const response = await api.post("/api/analyze", { image: imageBase64 });
    return response.data;
};

export const analyzeBody = async (imageBase64: string) => {
    const response = await api.post("/api/body-analyze", { image: imageBase64 });
    return response.data;
};

