
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
        <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gray-50 overflow-hidden font-sans">

            {/* Back Button */}
            {showBack && (
                <div className="absolute top-6 left-6 z-20">
                    <Link to="/">
                        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                            <MoveLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            )}

            {/* Main Content Card */}
            <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 p-8 md:p-10 z-20 animate-scale-in mx-auto">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="FitSnapAI Logo" className="h-16 w-auto object-contain" />
                </div>
                {children}
            </div>

            {/* Footer Copyright */}

        </div>
    );
}
