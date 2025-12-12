import { NavLink } from "react-router-dom";
import { Home, Camera, BarChart2, Users, ShoppingBag } from "lucide-react";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t flex justify-around py-3 z-50">
      
      {/* HOME BUTTON → redirects to your new Home.tsx */}
      <NavLink to="/home" className="flex flex-col items-center text-gray-600">
        <Home size={22} />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink to="/scan" className="flex flex-col items-center text-gray-600">
        <Camera size={22} />
        <span className="text-xs">Scan</span>
      </NavLink>

      <NavLink to="/progress" className="flex flex-col items-center text-gray-600">
        <BarChart2 size={22} />
        <span className="text-xs">Progress</span>
      </NavLink>

      <NavLink to="/coach" className="flex flex-col items-center text-gray-600">
        <Users size={22} />
        <span className="text-xs">Coach</span>
      </NavLink>

      <NavLink to="/shop" className="flex flex-col items-center text-gray-600">
        <ShoppingBag size={22} />
        <span className="text-xs">Shop</span>
      </NavLink>

    </nav>
  );
};
