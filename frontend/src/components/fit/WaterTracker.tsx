import { Droplets, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaterTrackerProps {
  current: number;
  goal: number;
  onAdd: (ml: number) => void;
  onSubtract?: (ml: number) => void;
}

export function WaterTracker({ current, goal, onAdd, onSubtract }: WaterTrackerProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const glassesCount = Math.floor(current / 250);
  const totalGlasses = Math.ceil(goal / 250);

  return (
    <div className="fit-card-elevated space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondary/20">
            <Droplets className="w-6 h-6 text-secondary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-subtitle text-foreground">Water Intake</h3>
            <p className="text-small text-muted-foreground">Stay hydrated!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-title text-secondary font-display">{current}</p>
          <p className="text-tiny text-muted-foreground">/ {goal} ml</p>
        </div>
      </div>

      {/* Visual glasses */}
      <div className="flex gap-1.5 flex-wrap justify-center py-2">
        {Array.from({ length: totalGlasses }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-8 rounded-b-lg border-2 transition-all duration-300 ${
              i < glassesCount 
                ? 'bg-secondary/30 border-secondary' 
                : 'bg-muted/30 border-border'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/70 transition-all duration-500"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-label={`${current} of ${goal} milliliters of water consumed`}
          />
        </div>
        <p className="text-center text-tiny text-muted-foreground">
          {Math.round(percentage)}% of daily goal
        </p>
      </div>

      {/* Quick add buttons */}
      <div className="flex gap-2">
        {onSubtract && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => onSubtract(250)}
            aria-label="Remove 250 milliliters"
            className="shrink-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
        )}
        
        <div className="flex gap-2 flex-1">
          {[200, 300, 500].map((ml) => (
            <Button
              key={ml}
              variant="secondary-pill"
              size="sm"
              onClick={() => onAdd(ml)}
              className="flex-1"
              aria-label={`Add ${ml} milliliters of water`}
            >
              <Plus className="w-3 h-3 mr-1" />
              {ml}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
