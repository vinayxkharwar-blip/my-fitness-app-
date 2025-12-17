import { NavLink, useLocation } from "react-router-dom";
import { Home, ScanLine, BarChart2, Users, Dumbbell } from "lucide-react";

export const BottomNav = () => {
    const location = useLocation();

    // Hide on Auth/Landing
    const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname);
    if (isAuthOrLanding) return null;

    const navItems = [
        { to: "/home", icon: Home, label: "Home" },
        { to: "/plans", icon: Dumbbell, label: "Plans" },
        { to: "/scan", icon: ScanLine, label: "Scan" },
        { to: "/progress", icon: BarChart2, label: "Stats" },
        { to: "/coach", icon: Users, label: "Coach" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-100 pb-safe">
            <nav className="flex justify-between items-center px-6 py-3 max-w-md mx-auto">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname === to;
                    const isScan = label === "Scan";

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group
                                ${isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"}
                                ${isScan ? "px-4" : ""}
                            `}
                        >
                            <div className={`
                                flex items-center justify-center rounded-2xl transition-all duration-300
                                ${isScan ? (isActive ? "bg-primary/10 text-primary p-3" : "bg-slate-50 text-slate-500 p-3") : "p-1"}
                            `}>
                                <Icon
                                    size={isScan ? 24 : 22}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className="transition-transform duration-300 group-active:scale-95"
                                />
                            </div>

                            {/* Label - visible mostly for context or strictly minimal? User said "Calm, clean". Let's keep labels small. */}
                            <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                                {label}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};
