import { useNavigate } from "react-router-dom";
import { ArrowLeft, Utensils, RefreshCw, Check, Dumbbell, Flame } from "lucide-react";
import { Button } from "@/components/common/button";
import { Helmet } from "react-helmet-async";

const meals = [
  { id: "breakfast", name: "Breakfast", time: "7:00 AM", suggestion: "Oatmeal with berries and almonds", calories: 350 },
  { id: "lunch", name: "Lunch", time: "12:30 PM", suggestion: "Grilled chicken salad with olive oil", calories: 520 },
  { id: "snack", name: "Snack", time: "3:30 PM", suggestion: "Greek yogurt with honey", calories: 180 },
  { id: "dinner", name: "Dinner", time: "7:00 PM", suggestion: "Salmon with roasted vegetables", calories: 620 },
];

const exercises = [
  { id: "1", name: "Warm-up: Light jogging", duration: "5 min" },
  { id: "2", name: "Squats", sets: "3×12" },
  { id: "3", name: "Push-ups", sets: "3×10" },
  { id: "4", name: "Plank hold", duration: "45 sec ×3" },
  { id: "5", name: "Cool-down stretches", duration: "5 min" },
];

const Plans = () => {
  const navigate = useNavigate();

  const handleSwapMeal = (id: string) => {
    // Toast functionality can be added later
    alert("Finding alternatives for you!");
  };

  const handleCompleteWorkout = () => {
    alert("Workout complete! 💪 Amazing work!");
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <>
      <Helmet>
        <title>My Plans - FitSnap Coach</title>
        <meta name="description" content="Your personalized diet and workout plans. Follow meal suggestions and exercise routines tailored to your goals." />
      </Helmet>

      <div className="min-h-screen w-full bg-[#E9EEF3] pb-32 text-[#1F2937] font-sans selection:bg-[#9ED9E6]/30">

        {/* Header */}
        <header className="px-6 pt-8 pb-6 flex items-center gap-4 sticky top-0 z-20 bg-[#E9EEF3]/90 backdrop-blur-md">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-black/5 text-[#1F2937] transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold font-heading text-[#1F2937] tracking-tight">My Plans</h1>
            <p className="text-sm text-gray-500 font-medium">Today's nutrition & workout</p>
          </div>
        </header>

        <main className="px-6 space-y-6">

          {/* Daily Summary Card */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#FFF7ED]">
                  <Flame className="w-6 h-6 text-[#FFA07A]" fill="#FFA07A" />
                </div>
                <span className="text-lg font-bold text-[#1F2937]">Daily Target</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-[#FFA07A] font-heading">{totalCalories}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Calories Planned</p>
              </div>
            </div>

            {/* Macro Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-[#FFF7ED] text-center">
                <p className="text-xl font-bold text-[#1F2937]">120g</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Protein</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#E0F2FE] text-center">
                <p className="text-xl font-bold text-[#1F2937]">200g</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Carbs</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#F0FDF4] text-center">
                <p className="text-xl font-bold text-[#1F2937]">65g</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Fats</p>
              </div>
            </div>
          </div>

          {/* Meal Plan Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1F2937] flex items-center gap-2 px-2">
              <Utensils className="w-5 h-5 text-[#FFA07A]" />
              Meal Plan
            </h2>

            <div className="space-y-3">
              {meals.map((meal, index) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-[2rem] p-5 shadow-xl shadow-blue-900/5 border border-white animate-fade-in-up hover:scale-[1.01] transition-transform"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-bold text-[#1F2937]">{meal.name}</span>
                        <span className="text-xs text-gray-400 font-medium">• {meal.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2 leading-relaxed">{meal.suggestion}</p>
                      <p className="text-xs text-[#FFA07A] font-bold">{meal.calories} kcal</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSwapMeal(meal.id)}
                      className="rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#9ED9E6] transition-colors flex-shrink-0"
                      aria-label={`Swap ${meal.name}`}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workout Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1F2937] flex items-center gap-2 px-2">
              <Dumbbell className="w-5 h-5 text-[#9ED9E6]" />
              Today's Workout
            </h2>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white space-y-4">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm font-medium text-[#1F2937]">{exercise.name}</span>
                  <span className="text-sm font-bold text-gray-400">
                    {exercise.sets || exercise.duration}
                  </span>
                </div>
              ))}

              <Button
                onClick={handleCompleteWorkout}
                className="w-full h-14 rounded-[2rem] text-base font-bold bg-[#9ED9E6] hover:bg-[#8CD0E0] text-[#1F2937] shadow-xl shadow-[#9ED9E6]/20 transition-all hover:scale-[1.02] border-none mt-6"
                aria-label="Mark workout as completed"
              >
                <Check className="w-5 h-5 mr-2" />
                Mark Completed
              </Button>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default Plans;
