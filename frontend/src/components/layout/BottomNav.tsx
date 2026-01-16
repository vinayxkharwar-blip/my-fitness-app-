import { NavLink, useLocation } from "react-router-dom";
import { Home, ScanLine, BarChart2, Users, Dumbbell, Moon } from "lucide-react";

export const BottomNav = () => {
    const location = useLocation();

    // Hide on Auth/Landing
    const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname);
    if (isAuthOrLanding) return null;

    const navItems = [
        { to: "/home", icon: Home, label: "Home" },
        { to: "/plans", icon: Dumbbell, label: "Plans" },
        { to: "/scan", icon: ScanLine, label: "Scan" },
        { to: "/sleep", icon: Moon, label: "Sleep" },
        { to: "/coach", icon: Users, label: "Coach" },
    ];

    return (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
            <nav className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-900/10 rounded-full px-6 py-3 flex items-center justify-between gap-6 w-[90%] max-w-sm">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname === to;
                    const isScan = label === "Scan";

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group
                                ${isActive ? "text-[#1F2937] scale-105" : "text-gray-400 hover:text-gray-600"}
                            `}
                        >
                            <div className={`
                                flex items-center justify-center rounded-full transition-all duration-300
                                ${isScan ? (isActive ? "bg-[#9ED9E6] text-[#1F2937] p-3.5 shadow-xl shadow-[#9ED9E6]/40" : "bg-[#9ED9E6] text-[#1F2937] p-3.5 shadow-lg") : "p-1"}
                            `}>
                                <Icon
                                    size={isScan ? 24 : 22}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className="transition-transform duration-300 group-active:scale-95"
                                />
                            </div>

                            {/* Label - minimal */}
                            {!isScan && (
                                <span className={`text-[9px] font-bold transition-colors ${isActive ? "text-[#1F2937]" : "text-gray-400 group-hover:text-gray-500"}`}>
                                    {label}
                                </span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};
