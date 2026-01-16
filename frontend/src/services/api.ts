
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

export const chatWithCoach = async (message: string, userId?: string) => {
    return apiRequest("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message, user_id: userId }),
    });
};

export const analyzeMeal = async (imageBase64: string) => {
    return apiRequest("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ image: imageBase64 }),
    });
};

export const analyzeBody = async (imageBase64: string) => {
    return apiRequest("/api/body-analyze", {
        method: "POST",
        body: JSON.stringify({ image: imageBase64 }),
    });
};
