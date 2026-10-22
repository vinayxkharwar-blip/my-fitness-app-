import { NavLink, useLocation } from "react-router-dom";
import { Home, Utensils, MessageSquare, Calendar, User } from "lucide-react";
import { cn } from "@/utils/utils";

export const BottomNav = () => {
    const location = useLocation();

    // Hide on Auth/Landing
    const isAuthOrLanding = ["/", "/login", "/signup", "/register"].includes(location.pathname) || location.pathname.startsWith('/onboarding');
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
            <nav className="bg-white border-t border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between shadow-lg">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname.startsWith(to) || location.pathname === to;

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-200 px-2 py-1 rounded-lg",
                                isActive ? "text-[#16A34A] font-semibold" : "text-[#64748B] hover:text-[#0F172A]"
                            )}
                        >
                            <Icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={cn(
                                    "transition-colors",
                                    isActive ? "text-[#16A34A]" : "text-[#64748B]"
                                )}
                            />
                            <span className="text-[10px] leading-tight">
                                {label}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};
