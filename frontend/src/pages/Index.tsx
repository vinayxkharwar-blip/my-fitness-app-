import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-20 pb-10 px-4"
      style={{ backgroundColor: "#12492f" }}
    >

      {/* Logo */}
      <div className="mb-8">
        <img
          src="/logo.png"
          className="w-16 h-16"
          alt="App Logo"
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-4 leading-tight text-white">
        Your AI-Powered <br /> Fitness Companion
      </h1>

      {/* Subtitle */}
      <p className="text-white/80 text-center max-w-md mb-8">
        Snap photos of your meals, get instant nutrition insights,
        and receive personalized workout plans.
      </p>

      {/* Feature Pills */}
      <div className="flex gap-3 mb-10 flex-wrap justify-center">
        <span className="px-4 py-2 bg-white shadow rounded-full text-sm flex items-center gap-1 text-[#12492f]">
          🥗 AI Meal Analysis
        </span>
        <span className="px-4 py-2 bg-white shadow rounded-full text-sm flex items-center gap-1 text-[#12492f]">
          💡 Smart Nutrition
        </span>
        <span className="px-4 py-2 bg-white shadow rounded-full text-sm flex items-center gap-1 text-[#12492f]">
          🏋️ Custom Workouts
        </span>
      </div>

      {/* Get Started Button */}
      <Button
        onClick={() => navigate("/signup")}
        className="px-10 py-4 text-lg rounded-xl shadow-md
                   bg-white text-[#12492f] hover:opacity-90"
      >
        Get Started Free
      </Button>

    </div>
  );
}
