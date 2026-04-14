import { NavLink, useLocation, Link } from "react-router-dom";
import { Home, Utensils, MessageSquare, Calendar, Moon, User } from "lucide-react";
import { cn } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";

export const DesktopSidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname) || location.pathname.startsWith('/onboarding');
    if (isAuthOrLanding) return null;

    const navItems = [
        { to: "/home", icon: Home, label: "Home" },
        { to: "/log-meal", icon: Utensils, label: "Nutrition" },
        { to: "/coach", icon: MessageSquare, label: "AI Coach" },
        { to: "/trainers", icon: Calendar, label: "Bookings" },
        { to: "/sleep", icon: Moon, label: "Sleep Cycle" },
        { to: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <aside className="hidden md:flex flex-col w-[240px] shrink-0 bg-[#0d1120] border-r border-[rgba(255,255,255,0.07)] relative z-40 font-sans">
            <div className="p-6 flex items-center">
                <Link to="/home" className="hover:opacity-90 transition-opacity flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] flex items-center justify-center relative shadow-[0_0_16px_rgba(52,211,153,0.35)]" style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}>
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12h4l3-9 5 18 3-9h3" />
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-[1.2rem] font-bold text-[#f5f0e8] leading-none tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>FitSnap</span>
                        <span className="text-[7px] font-bold text-[#6b7a99] uppercase tracking-[0.1em] mt-1">AI-POWERED WELLNESS</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname.startsWith(to) || location.pathname === to;
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={cn(
                                "flex items-center gap-3.5 px-[14px] py-[12px] rounded-[12px] transition-all duration-200 group relative",
                                isActive
                                    ? "bg-[rgba(52,211,153,0.1)] text-[#34d399]"
                                    : "text-[#6b7a99] hover:bg-[#141927]"
                            )}
                            style={isActive ? { fontWeight: 600 } : {}}
                        >
                            <Icon size={20} className={isActive ? "text-[#34d399]" : "text-[#6b7a99] group-hover:text-[#f5f0e8] transition-colors"} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[14px]">{label}</span>
                            {isActive && (
                                <div className="absolute right-[-16px] top-[15%] bottom-[15%] w-[3px] bg-[#34d399] rounded-l-full" />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {user && (
                <div className="p-4 border-t border-[rgba(255,255,255,0.07)] mt-auto bg-[#0d1120]">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] flex items-center justify-center shrink-0">
                            <span className="text-[#064e3b] font-bold text-sm" style={{ fontFamily: '"Playfair Display", serif' }}>
                                {(user.full_name || 'V').charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-[14px] font-bold text-[#f5f0e8] truncate leading-tight">{user.full_name || 'Vinay Kharwar'}</p>
                            <p className="text-[11px] text-[#34d399] truncate font-medium leading-tight mt-0.5">Premium Member</p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};
