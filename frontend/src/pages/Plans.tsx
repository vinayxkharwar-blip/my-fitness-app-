import { useNavigate } from "react-router-dom";
import { ArrowLeft, Utensils, RefreshCw, Check, Dumbbell, Flame } from "lucide-react";
import { Button } from "@/components/common/button";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const meals = [
  { id: "breakfast", name: "Breakfast", time: "7:00 AM", suggestion: "Oatmeal with blueberries, chia seeds and whey isolate", calories: 380, protein: 32 },
  { id: "lunch", name: "Lunch", time: "12:30 PM", suggestion: "Grilled herb chicken breast with quinoa and avocado greens", calories: 540, protein: 48 },
  { id: "snack", name: "Snack", time: "3:30 PM", suggestion: "Non-fat Greek yogurt with raw honey & roasted walnuts", calories: 210, protein: 18 },
  { id: "dinner", name: "Dinner", time: "7:00 PM", suggestion: "Pan-seared Atlantic salmon with steamed asparagus & sweet potato", calories: 610, protein: 44 },
];

const exercises = [
  { id: "1", name: "Dynamic Warm-up & Foam Rolling", duration: "5 min" },
  { id: "2", name: "Barbell Back Squats", sets: "4 × 10 (70% 1RM)" },
  { id: "3", name: "Incline Dumbbell Press", sets: "3 × 12 reps" },
  { id: "4", name: "Romanian Deadlifts", sets: "3 × 10 reps" },
  { id: "5", name: "Hanging Knee Raises", sets: "3 × 15 reps" },
  { id: "6", name: "Post-workout Mobility Cooldown", duration: "5 min" },
];

const Plans = () => {
  const navigate = useNavigate();

  const handleSwapMeal = (id: string) => {
    toast.info(`Generating personalized macro-matched alternative for ${id}...`);
  };

  const handleCompleteWorkout = () => {
    toast.success("Workout logged! 💪 Awesome progress today.");
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <>
      <Helmet>
        <title>My Plans - FitSnap Coach</title>
        <meta name="description" content="Your personalized diet and workout plans. Follow meal suggestions and exercise routines tailored to your goals." />
      </Helmet>

      <div className="min-h-screen w-full bg-[#F3F6F8] pb-32 text-[#0F172A] font-sans">

        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-all text-[#64748B]"
            >
              <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
            </button>
            <div>
              <h1 className="text-xl font-extrabold text-[#0F172A] tracking-tight">Today's Regimen Plans</h1>
              <p className="text-xs text-[#64748B]">Personalized daily macro distribution and strength programming</p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

          {/* Daily Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                  <Flame className="w-6 h-6 text-amber-600 fill-amber-600" />
                </div>
                <div>
                  <span className="text-base font-bold text-[#0F172A] block">Calorie Target</span>
                  <span className="text-xs text-[#64748B]">Planned nutritional budget</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-[#16A34A]">{totalCalories}</p>
                <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">kcal planned</p>
              </div>
            </div>

            {/* Macro Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <p className="text-xl font-extrabold text-[#0F172A]">142g</p>
                <p className="text-[10px] text-blue-700 font-bold uppercase tracking-wider mt-0.5">Protein</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <p className="text-xl font-extrabold text-[#0F172A]">190g</p>
                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider mt-0.5">Carbs</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                <p className="text-xl font-extrabold text-[#0F172A]">55g</p>
                <p className="text-[10px] text-rose-700 font-bold uppercase tracking-wider mt-0.5">Fats</p>
              </div>
            </div>
          </div>

          {/* Meal Plan Section */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2 px-1">
              <Utensils className="w-4 h-4 text-[#16A34A]" />
              Nutrition & Meal Schedule
            </h2>

            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#0F172A]">{meal.name}</span>
                        <span className="text-xs text-[#64748B] font-medium">• {meal.time}</span>
                      </div>
                      <p className="text-xs text-[#64748B] mb-2 leading-relaxed">{meal.suggestion}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                          {meal.calories} kcal
                        </span>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {meal.protein}g protein
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSwapMeal(meal.name)}
                      className="rounded-xl hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#16A34A] transition-colors flex-shrink-0 border border-[#E2E8F0]"
                      title="Swap Meal Suggestion"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workout Section */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2 px-1">
              <Dumbbell className="w-4 h-4 text-[#16A34A]" />
              Workout Programming
            </h2>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E2E8F0] space-y-3">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between py-2.5 border-b border-[#E2E8F0] last:border-0"
                >
                  <span className="text-xs font-semibold text-[#0F172A]">{exercise.name}</span>
                  <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-0.5 rounded-lg border border-[#BBF7D0]">
                    {exercise.sets || exercise.duration}
                  </span>
                </div>
              ))}

              <button
                onClick={handleCompleteWorkout}
                className="w-full h-12 rounded-xl text-xs font-bold bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm transition-all mt-4 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Check className="w-4 h-4" />
                Complete Today's Workout
              </button>
            </div>
          </div>

        </main>
      </div>
    </>
  );
};

export default Plans;
