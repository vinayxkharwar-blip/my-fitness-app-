import { useState } from "react";
import { Check, Flame } from "lucide-react";

interface HabitTileProps {
  id: string;
  name: string;
  icon?: React.ReactNode;
  completed?: boolean;
  streak?: number;
  onToggle?: (id: string, completed: boolean) => void;
}

export function HabitTile({ 
  id, 
  name, 
  icon, 
  completed = false, 
  streak = 0,
  onToggle 
}: HabitTileProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleToggle = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    
    if (newState) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 600);
    }
    
    onToggle?.(id, newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
        isCompleted 
          ? 'bg-accent/10 border-accent/30' 
          : 'bg-card border-border hover:border-accent/30'
      }`}
      aria-label={`${name} habit, ${isCompleted ? 'completed' : 'not completed'}. ${streak} day streak`}
      aria-pressed={isCompleted}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isCompleted ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {showAnimation ? (
              <Check className="w-5 h-5 animate-check" aria-hidden="true" />
            ) : (
              icon || <Check className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
          <div>
            <p className={`text-body-medium transition-colors ${
              isCompleted ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {name}
            </p>
            {streak > 0 && (
              <div className="flex items-center gap-1 mt-0.5">
                <Flame className="w-3 h-3 text-accent" aria-hidden="true" />
                <span className="text-tiny text-accent font-medium">{streak} day streak</span>
              </div>
            )}
          </div>
        </div>

        {isCompleted && (
          <div className="text-right">
            <span className="text-tiny text-success font-medium">+1 day 🔥</span>
          </div>
        )}
      </div>

      {isCompleted && (
        <p className="text-tiny text-muted-foreground mt-2 pl-13">
          Nice! Keep up the great work 💪
        </p>
      )}
    </button>
  );
}
