import { NavLink, useLocation, Link } from "react-router-dom";
import { Home, Utensils, MessageSquare, Calendar, Moon, User, LogOut } from "lucide-react";
import { cn } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";

export const DesktopSidebar = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const isAuthOrLanding = ["/", "/login", "/signup", "/register"].includes(location.pathname) || location.pathname.startsWith('/onboarding');
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
        <aside className="hidden md:flex flex-col justify-between w-[250px] h-screen shrink-0 bg-white border-r border-[#E2E8F0] relative z-40 font-sans shadow-sm">
            {/* Brand Logo Header */}
            <div className="p-6 flex items-center border-b border-[#F1F5F9]">
                <Link to="/home" className="hover:opacity-90 transition-opacity flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-500 shadow-sm shadow-green-600/20">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12h4l3-9 5 18 3-9h3" />
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-[1.25rem] font-extrabold text-[#0F172A] leading-none tracking-tight">FitSnap</span>
                        <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider mt-1">AI FITNESS COACH</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname.startsWith(to) || location.pathname === to;
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={cn(
                                "flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative text-sm font-medium",
                                isActive
                                    ? "bg-[#F0FDF4] text-[#16A34A] font-semibold shadow-xs"
                                    : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                            )}
                        >
                            <Icon 
                                size={19} 
                                className={cn(
                                    "transition-colors",
                                    isActive ? "text-[#16A34A]" : "text-[#64748B] group-hover:text-[#0F172A]"
                                )} 
                                strokeWidth={isActive ? 2.5 : 2} 
                            />
                            <span>{label}</span>
                            {isActive && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#16A34A] rounded-l-full" />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Footer Profile & Logout */}
            <div className="p-4 border-t border-[#E2E8F0] mt-auto bg-[#F8FAFC]/50">
                <div className="flex items-center justify-between gap-3">
                    <Link to="/profile" className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-85 transition-opacity">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
                            {(user?.full_name || 'F').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-xs font-bold text-[#0F172A] truncate leading-tight">{user?.full_name || 'FitSnap User'}</p>
                            <p className="text-[10px] text-green-700 truncate font-semibold leading-tight mt-0.5">Active Member</p>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        title="Log out"
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
};
