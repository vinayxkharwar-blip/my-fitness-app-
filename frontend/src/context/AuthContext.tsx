import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { api } from "../lib/api";

interface User {
    id: string; // The Clerk user ID
    full_name: string;
    email: string;
    image_url?: string;
    profile_image?: string;
    role: string;
    is_profile_complete: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { isLoaded, isSignedIn, user: clerkUser } = useUser();
    const { signOut } = useClerkAuth();

    const [user, setUser] = useState<User | null>(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    useEffect(() => {
        if (!isLoaded) return; // Wait for clerk to finish initial load

        if (isSignedIn && clerkUser) {
            // We are authenticated with Clerk. Pick up local DB profile status.
            setIsProfileLoading(true);

            // Check if profile exists in backend DB. 
            // In a real app, you might sync user data via webhook, but here we just check if they created a profile.
            api.get("/api/profile")
                .then(res => {
                    setUser({
                        id: clerkUser.id,
                        full_name: clerkUser.fullName || "",
                        email: clerkUser.primaryEmailAddress?.emailAddress || "",
                        image_url: clerkUser.imageUrl,
                        profile_image: res.data?.profile_image || clerkUser.imageUrl,
                        role: "user",
                        is_profile_complete: true
                    });
                })
                .catch(_err => {
                    // Profile might not exist yet (404) or other error
                    setUser({
                        id: clerkUser.id,
                        full_name: clerkUser.fullName || "",
                        email: clerkUser.primaryEmailAddress?.emailAddress || "",
                        image_url: clerkUser.imageUrl,
                        role: "user",
                        is_profile_complete: false // Flag for onboarding redirect
                    });
                })
                .finally(() => {
                    setIsProfileLoading(false);
                });
        } else {
            setUser(null);
            setIsProfileLoading(false);
        }
    }, [isLoaded, isSignedIn, clerkUser]);

    const logout = () => {
        signOut();
        setUser(null);
    };

    // The entire auth context is loading if clerk is still initializing, or we are fetching profile
    const isLoading = !isLoaded || isProfileLoading;

    return (
        <AuthContext.Provider value={{ user, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
