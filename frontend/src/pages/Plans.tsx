import { useNavigate } from "react-router-dom";
import { ArrowLeft, Utensils, RefreshCw, Check, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/fit/BottomNav";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleSwapMeal = (id: string) => {
    toast({
      title: "Finding alternatives...",
      description: "We'll suggest a similar meal for you!",
    });
  };

  const handleCompleteWorkout = () => {
    toast({
      title: "Workout complete! 💪",
      description: "Amazing work! You're getting stronger every day.",
    });
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <>
      <Helmet>
        <title>My Plans - FitSnap AI</title>
        <meta name="description" content="Your personalized diet and workout plans. Follow meal suggestions and exercise routines tailored to your goals." />
      </Helmet>

      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-subtitle text-foreground font-display">My Plans</h1>
              <p className="text-small text-muted-foreground">Today's nutrition & workout</p>
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
          {/* Daily Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-premium border border-border/20 text-card-foreground">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-accent/20">
                  <Utensils className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <span className="text-body-medium text-foreground">Daily Target</span>
              </div>
              <div className="text-right">
                <p className="text-title text-primary font-display">{totalCalories}</p>
                <p className="text-tiny text-muted-foreground">calories planned</p>
              </div>
            </div>
            <div className="flex gap-4 text-center">
              <div className="flex-1 p-2 rounded-lg bg-secondary/30">
                <p className="text-subtitle text-foreground">120g</p>
                <p className="text-tiny text-muted-foreground">Protein</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-secondary/30">
                <p className="text-subtitle text-foreground">200g</p>
                <p className="text-tiny text-muted-foreground">Carbs</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-secondary/30">
                <p className="text-subtitle text-foreground">65g</p>
                <p className="text-tiny text-muted-foreground">Fats</p>
              </div>
            </div>
          </div>

          {/* Meal Cards */}
          <div className="space-y-3">
            <h2 className="text-subtitle text-foreground font-display flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Meal Plan
            </h2>

            {meals.map((meal, index) => (
              <div
                key={meal.id}
                className="bg-card rounded-xl p-4 border border-border/20 animate-slide-up text-card-foreground shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-body-medium text-foreground font-semibold">{meal.name}</span>
                      <span className="text-tiny text-muted-foreground">• {meal.time}</span>
                    </div>
                    <p className="text-small text-muted-foreground/80">{meal.suggestion}</p>
                    <p className="text-tiny text-primary mt-1 font-medium">{meal.calories} kcal</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleSwapMeal(meal.id)}
                    aria-label={`Swap ${meal.name}`}
                    className="hover:bg-secondary"
                  >
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Workout Card */}
          <div className="space-y-3">
            <h2 className="text-subtitle text-foreground font-display flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-secondary-foreground" />
              Today's Workout
            </h2>

            <div className="bg-card rounded-2xl p-6 shadow-premium border border-border/20 space-y-3 text-card-foreground">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between py-2 border-b border-border/10 last:border-0"
                >
                  <span className="text-body text-foreground">{exercise.name}</span>
                  <span className="text-small text-muted-foreground">
                    {exercise.sets || exercise.duration}
                  </span>
                </div>
              ))}

              <Button
                variant="default"
                size="lg"
                onClick={handleCompleteWorkout}
                className="w-full mt-4 bg-primary text-white hover:bg-primary/90 rounded-full"
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
