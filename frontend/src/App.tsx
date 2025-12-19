import { useEffect, useState } from "react";
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
import Profile from "./pages/Profile";
import Trainers from "./pages/Trainers";
import NotFound from "./pages/NotFound";
import GoalSelection from "./pages/GoalSelection";
import BodyMeasurements from "./pages/BodyMeasurements";

import { BottomNav } from "./pages/BottomNav";

import Splash from "./pages/Splash";

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  const isAuthOrLanding = ["/", "/login", "/signup", "/onboarding/goal", "/onboarding/measurements"].includes(location.pathname);

  useEffect(() => {
    if (isAuthOrLanding) {
      document.body.classList.remove("dashboard-theme");
    } else {
      document.body.classList.add("dashboard-theme");
    }
  }, [location.pathname, isAuthOrLanding]);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding/goal" element={<GoalSelection />} />
        <Route path="/onboarding/measurements" element={<BodyMeasurements />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/scan" element={<ScanMeal />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/profile" element={<Profile />} />
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
