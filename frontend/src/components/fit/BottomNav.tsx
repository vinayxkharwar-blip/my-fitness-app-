import { Home, Camera, TrendingUp, MessageCircle, ShoppingBag } from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground transition-colors"
      activeClassName="text-primary"
      aria-label={label}
    >
      <Icon className="w-6 h-6" aria-hidden="true" />
      <span className="text-tiny">{label}</span>
    </NavLink>
  );
}

export function BottomNav() {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40 pb-safe"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around py-1">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/scan" icon={Camera} label="Scan" />
        <NavItem to="/progress" icon={TrendingUp} label="Progress" />
        <NavItem to="/coach" icon={MessageCircle} label="Coach" />
        <NavItem to="/shop" icon={ShoppingBag} label="Shop" />
      </div>
    </nav>
  );
}
