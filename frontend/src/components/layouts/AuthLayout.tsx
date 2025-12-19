
import { ReactNode } from "react";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    noHeader?: boolean;
}

export function AuthLayout({ children, showBack = true, noHeader = false }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gradient-to-b from-[#0F1020] to-[#1A1B3A] overflow-hidden font-sans">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse-gentle" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Back Button */}
            {showBack && (
                <div className="absolute top-6 left-6 z-20">
                    <Link to="/">
                        <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                            <MoveLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            )}

            {/* Main Content Card */}
            <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 p-8 md:p-10 z-20 animate-scale-in mx-auto">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="FitSnap Logo" className="h-16 w-auto object-contain" />
                </div>
                {children}
            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-6 text-center text-xs text-white/30 font-medium">
                © 2024 FitLife. All rights reserved.
            </div>
        </div>
    );
}
