import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Splash from "./pages/Splash";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Coach from "./pages/Coach";
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
import SleepTracker from "./pages/SleepTracker";
import LogMeal from "./pages/LogMeal";
import PersonalInfo from "./pages/PersonalInfo";
import Notifications from "./pages/Notifications";
import AppSettings from "./pages/AppSettings";

import { BottomNav } from "./components/layout/BottomNav";
import { DesktopSidebar } from "./components/layout/DesktopSidebar";
import { MobileHeader } from "./components/layout/MobileHeader";

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0b0f1a] font-sans selection:bg-[#34d399]/30">
        {!isLanding && <DesktopSidebar />}

        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0b0f1a] relative">
          {!isLanding && <MobileHeader />}

          <main className="flex-1 flex flex-col w-full overflow-y-auto scrollbar-hide bg-[#0b0f1a] relative">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* Removed old auth routes */}

              {/* Onboarding */}
              <Route path="/onboarding/goal" element={<GoalSelection />} />
              <Route path="/onboarding/measurements" element={<BodyMeasurements />} />
              <Route path="/onboarding/body-measurements" element={<BodyMeasurements />} />

              {/* Dashboard Routes — all public */}
              <Route path="/home" element={<Home />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/sleep" element={<SleepTracker />} />
              <Route path="/scan" element={<ScanMeal />} />
              <Route path="/log-meal" element={<LogMeal />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/body" element={<BodyAnalysis />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/trainers" element={<Trainers />} />

              {/* Profile Settings */}
              <Route path="/profile/personal-info" element={<PersonalInfo />} />
              <Route path="/profile/notifications" element={<Notifications />} />
              <Route path="/profile/settings" element={<AppSettings />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {!isLanding && <BottomNav />}
        </div>
    </div>
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
