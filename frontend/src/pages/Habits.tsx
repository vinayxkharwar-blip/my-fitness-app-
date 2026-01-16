import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Apple, Moon, Footprints, Dumbbell } from "lucide-react";
import { Button } from "@/components/common/button";
import { HabitTile } from "@/components/features/tracker/HabitTile";

import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const initialHabits = [
  { id: "water", name: "Drink 8 glasses of water", icon: <Droplets className="w-5 h-5" />, streak: 5, completed: false },
  { id: "fruit", name: "Eat 2 servings of fruit", icon: <Apple className="w-5 h-5" />, streak: 3, completed: false },
  { id: "sleep", name: "Sleep before 11 PM", icon: <Moon className="w-5 h-5" />, streak: 7, completed: true },
  { id: "walk", name: "10,000 steps", icon: <Footprints className="w-5 h-5" />, streak: 12, completed: false },
  { id: "exercise", name: "30 min exercise", icon: <Dumbbell className="w-5 h-5" />, streak: 4, completed: false },
];

const Habits = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [habits, setHabits] = useState(initialHabits);

  const handleToggle = (id: string, completed: boolean) => {
    setHabits(prev => prev.map(h =>
      h.id === id ? { ...h, completed, streak: completed ? h.streak + 1 : h.streak } : h
    ));

    if (completed) {
      toast({
        title: "Nice! +1 day on your streak 🔥",
        description: "You're building great habits. Keep going!",
      });
    }
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <>
      <Helmet>
        <title>Daily Habits - FitSnapAI</title>
        <meta name="description" content="Build healthy habits one day at a time. Track your daily routines and maintain your streaks." />
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
              <h1 className="text-subtitle text-foreground font-display">Daily Habits</h1>
              <p className="text-small text-muted-foreground">{completedCount} of {habits.length} completed</p>
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 pt-6 space-y-3">
          {/* Progress indicator */}
          <div className="bg-card rounded-2xl p-4 shadow-premium border border-white/5 text-card-foreground">
            <div className="flex items-center justify-between mb-3">
              <span className="text-body-medium text-foreground">Today's Progress</span>
              <span className="text-subtitle text-primary font-display">
                {Math.round((completedCount / habits.length) * 100)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(completedCount / habits.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Habit list */}
          {habits.map((habit, index) => (
            <div
              key={habit.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <HabitTile
                {...habit}
                onToggle={handleToggle}
              />
            </div>
          ))}

          {/* Encouragement */}
          {completedCount === habits.length && (
            <div className="bg-card/10 border border-success/20 text-center py-6 animate-scale-up rounded-2xl">
              <p className="text-title text-success font-display mb-2">
                Amazing! All habits complete! 🎉
              </p>
              <p className="text-body text-success/80">
                You're crushing it today. See you tomorrow!
              </p>
            </div>
          )}
        </main>


      </div>
    </>
  );
};

export default Habits;
