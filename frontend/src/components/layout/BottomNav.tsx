import { NavLink, useLocation } from "react-router-dom";
import { Home, Utensils, MessageSquare, Calendar, User } from "lucide-react";
import { cn } from "@/utils/utils";

export const BottomNav = () => {
    const location = useLocation();

    // Hide on Auth/Landing
    const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname) || location.pathname.startsWith('/onboarding');
    if (isAuthOrLanding) return null;

    const navItems = [
        { to: "/home", icon: Home, label: "Home" },
        { to: "/log-meal", icon: Utensils, label: "Nutrition" },
        { to: "/coach", icon: MessageSquare, label: "AI Coach" },
        { to: "/trainers", icon: Calendar, label: "Bookings" },
        { to: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 md:hidden pb-safe">
            <nav className="bg-[#111111] border-t border-zinc-800 px-6 py-4 flex items-center justify-between shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname.startsWith(to) || location.pathname === to;

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group",
                                isActive ? "text-[#22C55E]" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <div className="relative">
                                <Icon
                                    size={24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={cn(
                                        "transition-all duration-300",
                                        isActive && "drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                                    )}
                                />
                            </div>

                            <span className={cn(
                                "text-[10px] font-medium transition-colors",
                                isActive ? "text-[#22C55E]" : "text-zinc-500"
                            )}>
                                {label}
                            </span>

                            {/* Active Dot */}
                            {isActive && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#22C55E] rounded-full shadow-[0_0_8px_rgba(34,197,94,1)] animate-fade-in-up" />
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};
