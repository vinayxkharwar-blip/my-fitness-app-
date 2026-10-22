import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface GuardProps {
    children: React.ReactElement;
}

export const ProtectedRoute: React.FC<GuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b0f1a] text-white">
                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                <p className="text-sm text-slate-400 font-medium">Loading FitSnap...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export const PublicAuthRoute: React.FC<GuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b0f1a] text-white">
                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return children;
};
