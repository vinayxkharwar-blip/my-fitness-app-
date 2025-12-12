
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_URL}${endpoint}`;
    const defaultHeaders = {
        "Content-Type": "application/json",
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
