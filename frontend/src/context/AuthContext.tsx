import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";

export interface AuthUser {
    id: string;
    email: string;
    full_name?: string;
    goal?: string;
    height_cm?: number;
    weight_kg?: number;
    profile_image?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: AuthUser) => void;
    signup: (token: string, user: AuthUser) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<AuthUser | null>(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return null;
            }
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshUser = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.get("/api/auth/me");
            if (res.data) {
                const refreshed: AuthUser = {
                    id: res.data._id || res.data.id,
                    email: res.data.email,
                    full_name: res.data.full_name,
                    goal: res.data.goal,
                    height_cm: res.data.height_cm,
                    weight_kg: res.data.weight_kg,
                    profile_image: res.data.profile_image
                };
                setUser(refreshed);
                localStorage.setItem("user", JSON.stringify(refreshed));
            }
        } catch (err: any) {
            console.warn("Session refresh notice:", err?.response?.data?.error || err.message);
            if (err?.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            refreshUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (newToken: string, newUser: AuthUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const signup = (newToken: string, newUser: AuthUser) => {
        login(newToken, newUser);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                signup,
                logout,
                refreshUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
