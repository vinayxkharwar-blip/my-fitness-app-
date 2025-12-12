import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center text-center px-6 pt-20">

      {/* App Icon */}
      <div className="mb-6">
        <img
          src="/logo.png"
          alt="App Logo"
          className="w-20 h-20 drop-shadow-md"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
        Your AI-Powered <br /> Fitness Companion
      </h1>

      <p className="text-gray-600 max-w-md mt-4">
        Snap photos of your meals, get instant nutrition insights,  
        and receive personalized workout plans.
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <div className="px-4 py-2 bg-white rounded-full shadow text-sm">📸 AI Meal Analysis</div>
        <div className="px-4 py-2 bg-white rounded-full shadow text-sm">💡 Smart Nutrition</div>
        <div className="px-4 py-2 bg-white rounded-full shadow text-sm">⚡ Custom Workouts</div>
      </div>

      {/* Get Started Button */}
      <Button
        className="mt-10 bg-green-600 hover:bg-green-700 w-60 h-12 text-lg"
        onClick={() => navigate("/signup")}
      >
        Get Started Free
      </Button>

      {/* Sign-in link */}
      <div className="mt-6">
        <Link to="/login" className="text-gray-600 underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
