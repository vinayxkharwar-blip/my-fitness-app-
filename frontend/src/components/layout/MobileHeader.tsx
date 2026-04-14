import { Bell } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/common/Logo";

export const MobileHeader = () => {
    const location = useLocation();
    const { user } = useAuth();

    const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname) || location.pathname.startsWith('/onboarding');
    if (isAuthOrLanding) return null;

    return (
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5">
            <Link to="/home" className="flex items-center">
                <Logo className="w-auto h-7" />
            </Link>

            <div className="flex items-center gap-4">
                <button className="relative text-zinc-400 hover:text-white transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 border border-[#0A0A0A]"></span>
                </button>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform">
                    {user?.profile_image ? (
                        <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs font-medium text-zinc-400 uppercase">{user?.full_name?.charAt(0) || 'U'}</span>
                    )}
                </Link>
            </div>
        </header>
    );
};
