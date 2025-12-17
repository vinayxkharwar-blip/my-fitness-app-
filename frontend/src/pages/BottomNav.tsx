import { NavLink, useLocation } from "react-router-dom";
import { Home, Camera, BarChart2, Users, ShoppingBag } from "lucide-react";

export const BottomNav = () => {
    const location = useLocation();

    // Hide on Auth/Landing
    const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname);
    if (isAuthOrLanding) return null;

    const navItems = [
        { to: "/home", icon: Home, label: "Home" },
        { to: "/scan", icon: Camera, label: "Scan" }, // Highlighted middle button?
        { to: "/progress", icon: BarChart2, label: "Stats" },
        { to: "/coach", icon: Users, label: "Coach" },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
            <nav className="bg-[#0F1623]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-6 py-3 flex justify-between items-center text-zinc-400">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname === to;
                    const isScan = label === "Scan";

                    if (isScan) {
                        return (
                            <NavLink
                                key={to}
                                to={to}
                                className="relative -top-6 transform transition-transform hover:scale-105 active:scale-95"
                            >
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-indigo-600 shadow-xl shadow-primary/30 flex items-center justify-center text-white border-4 border-[#080C14]">
                                    <Icon size={24} />
                                </div>
                            </NavLink>
                        );
                    }

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? "text-primary scale-110" : "hover:text-white"
                                }`}
                        >
                            <Icon size={isActive ? 22 : 20} className={isActive ? "fill-primary/20" : ""} strokeWidth={isActive ? 2.5 : 2} />
                            {/* Optional: Label (hidden for cleaner look or visible) */}
                            {/* <span className="text-[10px] font-medium">{label}</span> */}
                            {isActive && <div className="h-1 w-1 rounded-full bg-primary absolute -bottom-2"></div>}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};
