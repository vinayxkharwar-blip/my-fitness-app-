import { useEffect, useState, ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useAuth } from "./context/AuthContext";
import Splash from "./pages/Splash";

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
import SleepTracker from "./pages/SleepTracker";
import LogMeal from "./pages/LogMeal";
import PersonalInfo from "./pages/PersonalInfo";
import Notifications from "./pages/Notifications";
import AppSettings from "./pages/AppSettings";

import { BottomNav } from "./components/layout/BottomNav";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Splash />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // FORCE ONBOARDING: If profile is not complete, and not already on an onboarding page, redirect to goal selection
  const isOnboardingPage = location.pathname.startsWith("/onboarding");

  // Robust check: treat undefined/null as false
  // @ts-ignore
  const isProfileComplete = !!user.is_profile_complete;

  if (!isProfileComplete && !isOnboardingPage) {
    return <Navigate to="/onboarding/goal" replace />;
  }

  // Allow users to access onboarding pages even if profile is complete (to update their info)

  return <>{children}</>;
};

// Public Only Route (for login/signup)
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Splash />;
  }

  if (user) {
    // Redirect to home (ProtectedRoute will handle diversion to onboarding if needed)
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const isAuthOrLanding = ["/", "/login", "/signup"].includes(location.pathname) || location.pathname.startsWith("/onboarding");

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

  useEffect(() => {
    // Global theme is now enforced by index.css
  }, [location.pathname]);

  if (showSplash || isLoading) {
    return <Splash />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Custom Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route path="/onboarding/goal" element={<ProtectedRoute><GoalSelection /></ProtectedRoute>} />
        <Route path="/onboarding/measurements" element={<ProtectedRoute><BodyMeasurements /></ProtectedRoute>} />
        <Route path="/onboarding/body-measurements" element={<ProtectedRoute><BodyMeasurements /></ProtectedRoute>} />

        {/* Protected Dashboard Routes */}
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

        {/* Profile Settings Routes */}
        <Route path="/profile/personal-info" element={<ProtectedRoute><PersonalInfo /></ProtectedRoute>} />
        <Route path="/profile/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/profile/settings" element={<ProtectedRoute><AppSettings /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Show BottomNav only when Signed In and not on landing pages */}
      {user && !isAuthOrLanding && <BottomNav />}
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
