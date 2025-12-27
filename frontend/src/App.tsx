import { useEffect, ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useAuth } from "./context/AuthContext";

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

import { BottomNav } from "./pages/BottomNav";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-indigo-600">Loading App...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Public Only Route (for login/signup)
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-indigo-600">Loading...</div>;
  }

  if (user) {
    // Redirect to home if already logged in
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  const isAuthOrLanding = ["/", "/login", "/signup", "/onboarding/goal", "/onboarding/measurements"].includes(location.pathname);

  useEffect(() => {
    console.log("AppContent mounted/updated", location.pathname);
    if (isAuthOrLanding) {
      document.body.classList.remove("dashboard-theme");
    } else {
      document.body.classList.add("dashboard-theme");
    }
  }, [location.pathname, isAuthOrLanding]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Custom Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route path="/onboarding/goal" element={<GoalSelection />} />
        <Route path="/onboarding/measurements" element={<BodyMeasurements />} />

        {/* Protected Dashboard Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/coach" element={<ProtectedRoute><Coach /></ProtectedRoute>} />
        <Route path="/sleep" element={<ProtectedRoute><SleepTracker /></ProtectedRoute>} />
        <Route path="/scan" element={<ProtectedRoute><ScanMeal /></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
        <Route path="/habits" element={<ProtectedRoute><Habits /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/body" element={<ProtectedRoute><BodyAnalysis /></ProtectedRoute>} />
        <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
        <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />

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
