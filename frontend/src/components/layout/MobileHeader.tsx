import { Bell } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const MobileHeader = () => {
    const location = useLocation();
    const { user } = useAuth();

    const isAuthOrLanding = ["/", "/login", "/signup", "/register"].includes(location.pathname) || location.pathname.startsWith('/onboarding');
    if (isAuthOrLanding) return null;

    return (
        <header className="md:hidden flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#E2E8F0] shadow-xs">
            <Link to="/home" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-500 shadow-xs">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h4l3-9 5 18 3-9h3" />
                    </svg>
                </div>
                <span className="text-lg font-extrabold text-[#0F172A] tracking-tight">FitSnap</span>
            </Link>

            <div className="flex items-center gap-3">
                <Link to="/profile/notifications" className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </Link>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform">
                    {user?.profile_image ? (
                        <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs font-bold text-green-700 uppercase">{user?.full_name?.charAt(0) || 'U'}</span>
                    )}
                </Link>
            </div>
        </header>
    );
};
