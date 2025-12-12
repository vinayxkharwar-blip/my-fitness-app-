import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// NEW HOME PAGE
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

// 🔥 BottomNav is in pages folder (your screenshot confirmed this)
import { BottomNav } from "./pages/BottomNav";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>

        {/* ALL ROUTES */}
        <Routes>

          {/* Landing */}
          <Route path="/" element={<Index />} />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* HOME */}
          <Route path="/home" element={<Home />} />

          {/* COACH PAGE */}
          <Route path="/coach" element={<Coach />} />

          {/* Other Pages */}
          <Route path="/progress" element={<Progress />} />
          <Route path="/scan" element={<ScanMeal />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/body" element={<BodyAnalysis />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/trainers" element={<Trainers />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

        {/* 🔥 Always show Bottom Navigation */}
        <BottomNav />

      </BrowserRouter>
    </HelmetProvider>
  );
}
