import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Coach from "./pages/Coach";
import Progress from "./pages/Progress";
import ScanMeal from "./pages/ScanMeal";
import Shop from "./pages/Shop";
import Habits from "./pages/Habits";
import BodyAnalysis from "./pages/BodyAnalysis";
import Plans from "./pages/Plans";
import Trainers from "./pages/Trainers";
import NotFound from "./pages/NotFound";

import { BottomNav } from "./pages/BottomNav";

function AppContent() {
  const location = useLocation();

  const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname);

  useEffect(() => {
    if (isAuthOrLanding) {
      document.body.classList.remove("dark-theme");
      // Optional: Add specific class if needed, but :root is default
    } else {
      document.body.classList.add("dark-theme");
    }
  }, [location.pathname, isAuthOrLanding]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/scan" element={<ScanMeal />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/body" element={<BodyAnalysis />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAuthOrLanding && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
