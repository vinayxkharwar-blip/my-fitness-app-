import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeeklyReport } from "@/components/fit/WeeklyReport";
import { BottomNav } from "@/components/fit/BottomNav";
import { Helmet } from "react-helmet-async";

const Progress = () => {
  const navigate = useNavigate();

  const mockData = {
    caloriesData: [1850, 2100, 1920, 2200, 1780, 2050, 1900],
    waterData: [2000, 2500, 1800, 2200, 2400, 1900, 2100],
    habitsCompleted: 28,
    habitsTotal: 35,
    bestDay: "Wednesday",
    streak: 12,
  };

  return (
    <>
      <Helmet>
        <title>Your Progress - FitSnap AI</title>
        <meta
          name="description"
          content="Track your weekly fitness progress. View your calorie intake, hydration levels, and habit completion rates."
        />
      </Helmet>

      {/* MAIN BACKGROUND */}
      <div
        className="min-h-screen pb-24"
        style={{ backgroundColor: "#12492f" }}
      >
        {/* HEADER */}
        <header
          className="sticky top-0 z-30 backdrop-blur-sm border-b border-white/10"
          style={{ backgroundColor: "#12492f" }}
        >
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <h1 className="text-white font-semibold text-lg">
              Weekly Progress
            </h1>
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-lg mx-auto px-4 pt-6">
          <WeeklyReport {...mockData} />
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Progress;
