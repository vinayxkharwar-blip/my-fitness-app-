import { Flame, Droplets, Apple, Wheat, Beef } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressCardProps {
  calories: { current: number; goal: number };
  protein: { current: number; goal: number };
  carbs: { current: number; goal: number };
  fats: { current: number; goal: number };
  water: { current: number; goal: number };
  onAddWater?: (ml: number) => void;
}

function MacroChip({ 
  icon: Icon, 
  label, 
  current, 
  goal, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  current: number; 
  goal: number; 
  color: string;
}) {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-muted/50">
      <Icon className={`w-4 h-4 ${color}`} aria-hidden="true" />
      <span className="text-tiny font-semibold text-foreground">{current}g</span>
      <span className="text-tiny text-muted-foreground">{label}</span>
      <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color.replace('text-', 'bg-')}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function ProgressCard({ 
  calories, 
  protein, 
  carbs, 
  fats, 
  water,
  onAddWater 
}: ProgressCardProps) {
  const caloriePercentage = Math.min((calories.current / calories.goal) * 100, 100);
  const waterPercentage = Math.min((water.current / water.goal) * 100, 100);

  return (
    <div className="fit-card-elevated space-y-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
      {/* Calories Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-accent/20">
              <Flame className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="text-body-medium text-foreground">Calories</p>
              <p className="text-tiny text-muted-foreground">Daily intake</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-title text-foreground font-display">{calories.current}</p>
            <p className="text-tiny text-muted-foreground">/ {calories.goal} kcal</p>
          </div>
        </div>
        
        <div className="fit-progress-bar">
          <div 
            className="fit-progress-fill progress-animate"
            style={{ width: `${caloriePercentage}%` }}
            role="progressbar"
            aria-valuenow={calories.current}
            aria-valuemin={0}
            aria-valuemax={calories.goal}
            aria-label={`${calories.current} of ${calories.goal} calories consumed`}
          />
        </div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-2">
        <MacroChip icon={Beef} label="Protein" current={protein.current} goal={protein.goal} color="text-rose-500" />
        <MacroChip icon={Wheat} label="Carbs" current={carbs.current} goal={carbs.goal} color="text-amber-500" />
        <MacroChip icon={Apple} label="Fats" current={fats.current} goal={fats.goal} color="text-emerald-500" />
      </div>

      {/* Water Tracker */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-secondary/20">
              <Droplets className="w-5 h-5 text-secondary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-body-medium text-foreground">Hydration</p>
              <p className="text-tiny text-muted-foreground">{water.current} / {water.goal} ml</p>
            </div>
          </div>
          <p className="text-subtitle text-secondary font-display">{Math.round(waterPercentage)}%</p>
        </div>

        <div className="flex gap-2">
          {[200, 300, 500].map((ml) => (
            <Button
              key={ml}
              variant="secondary-pill"
              size="sm"
              onClick={() => onAddWater?.(ml)}
              aria-label={`Add ${ml} milliliters of water`}
              className="flex-1 text-tiny"
            >
              +{ml} ml
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
