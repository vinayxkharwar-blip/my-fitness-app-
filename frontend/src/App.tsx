import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Splash from "./pages/Splash";

import Home from "./pages/Home";
import Coach from "./pages/Coach";
import ScanMeal from "./pages/ScanMeal";
import Shop from "./pages/Shop";
import Habits from "./pages/Habits";
import BodyAnalysis from "./pages/BodyAnalysis";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import Trainers from "./pages/Trainers";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import GoalSelection from "./pages/GoalSelection";
import BodyMeasurements from "./pages/BodyMeasurements";
import SleepTracker from "./pages/SleepTracker";
import LogMeal from "./pages/LogMeal";
import PersonalInfo from "./pages/PersonalInfo";
import Notifications from "./pages/Notifications";
import AppSettings from "./pages/AppSettings";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicAuthRoute } from "./components/auth/RouteGuards";

import { BottomNav } from "./components/layout/BottomNav";
import { DesktopSidebar } from "./components/layout/DesktopSidebar";
import { MobileHeader } from "./components/layout/MobileHeader";

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  // Hide global navigation and header on auth and onboarding pages
  const isAuthOrOnboarding = ["/", "/login", "/signup", "/register"].includes(location.pathname) || 
                             location.pathname.startsWith("/onboarding");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Enforce Clean Light Theme
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F3F6F8] text-[#0F172A] font-sans selection:bg-green-500/20 selection:text-green-900">
        {!isAuthOrOnboarding && <DesktopSidebar />}

        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F3F6F8] relative">
          {!isAuthOrOnboarding && <MobileHeader />}

          <main className="flex-1 flex flex-col w-full overflow-y-auto scrollbar-hide bg-[#F3F6F8] relative">
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* Public Auth Routes */}
              <Route path="/login" element={<PublicAuthRoute><Login /></PublicAuthRoute>} />
              <Route path="/signup" element={<PublicAuthRoute><Signup /></PublicAuthRoute>} />
              <Route path="/register" element={<Navigate to="/signup" replace />} />

              {/* Onboarding */}
              <Route path="/onboarding/goal" element={<GoalSelection />} />
              <Route path="/onboarding/measurements" element={<BodyMeasurements />} />
              <Route path="/onboarding/body-measurements" element={<BodyMeasurements />} />

              {/* Protected Application Routes */}
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/coach" element={<ProtectedRoute><Coach /></ProtectedRoute>} />
              <Route path="/sleep" element={<ProtectedRoute><SleepTracker /></ProtectedRoute>} />
              <Route path="/scan" element={<ProtectedRoute><ScanMeal /></ProtectedRoute>} />
              <Route path="/log-meal" element={<ProtectedRoute><LogMeal /></ProtectedRoute>} />
              <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
              <Route path="/habits" element={<ProtectedRoute><Habits /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/body" element={<ProtectedRoute><BodyAnalysis /></ProtectedRoute>} />
              <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
              <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />

              {/* Protected Profile Settings */}
              <Route path="/profile/personal-info" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
              <Route path="/profile/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/profile/settings" element={<ProtectedRoute><AppSettings /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {!isAuthOrOnboarding && <BottomNav />}
        </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
