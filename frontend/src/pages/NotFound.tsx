import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E9EEF3] px-4">
      <div className="text-center max-w-md animate-fade-in bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5">
        <div className="mb-6">
          <img src="/logo.png" alt="FitSnapAI Logo" className="h-24 w-auto object-contain mx-auto mb-4" />
          <span className="text-7xl font-display text-[#9ED9E6] font-bold">404</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1F2937] font-display mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8 font-medium">
          Oops! This page seems to have wandered off. Let's get you back on track! 🏃‍♂️
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="rounded-full bg-[#9ED9E6] text-[#1F2937] hover:bg-[#8CD0E0] font-bold"
            size="lg"
            asChild
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-gray-200 text-gray-500 hover:text-[#1F2937] hover:bg-gray-50"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
