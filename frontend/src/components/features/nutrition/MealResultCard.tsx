import { Flame, Beef, Wheat, Droplet, Leaf, Check, Pencil } from "lucide-react";
import { Button } from "@/components/common/button";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

interface MealResultCardProps {
  mealName?: string;
  imageUrl?: string;
  nutrition: NutritionData;
  onAddMeal?: () => void;
  onEditPortion?: () => void;
}

function NutritionTile({ 
  icon: Icon, 
  value, 
  unit, 
  label, 
  color 
}: { 
  icon: React.ElementType; 
  value: number; 
  unit: string; 
  label: string; 
  color: string;
}) {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-muted/50">
      <Icon className={`w-5 h-5 ${color} mb-1`} aria-hidden="true" />
      <span className="text-subtitle font-display text-foreground">{value}</span>
      <span className="text-tiny text-muted-foreground">{unit}</span>
      <span className="text-tiny text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}

export function MealResultCard({ 
  mealName = "Your Meal", 
  imageUrl, 
  nutrition, 
  onAddMeal, 
  onEditPortion 
}: MealResultCardProps) {
  return (
    <div className="fit-card-elevated space-y-5 animate-scale-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={`Photo of ${mealName}`}
            className="w-16 h-16 rounded-xl object-cover"
          />
        )}
        <div>
          <h3 className="text-subtitle text-foreground">{mealName}</h3>
          <p className="text-small text-muted-foreground">Nutrition analysis complete ✨</p>
        </div>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-3 flex flex-col items-center p-4 rounded-xl bg-accent/10 border border-accent/20">
          <Flame className="w-6 h-6 text-accent mb-1" aria-hidden="true" />
          <span className="text-hero font-display text-foreground">{nutrition.calories}</span>
          <span className="text-small text-muted-foreground">calories</span>
        </div>
        
        <NutritionTile icon={Beef} value={nutrition.protein} unit="g" label="Protein" color="text-rose-500" />
        <NutritionTile icon={Wheat} value={nutrition.carbs} unit="g" label="Carbs" color="text-amber-500" />
        <NutritionTile icon={Droplet} value={nutrition.fats} unit="g" label="Fats" color="text-emerald-500" />
      </div>

      {/* Fiber bonus */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border border-success/20">
        <Leaf className="w-5 h-5 text-success" aria-hidden="true" />
        <span className="text-body-medium text-foreground">{nutrition.fiber}g fiber</span>
        <span className="text-small text-muted-foreground">— Great for digestion!</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="primary-pill"
          size="lg"
          onClick={onAddMeal}
          className="flex-1"
          aria-label="Add this meal to your daily log"
        >
          <Check className="w-5 h-5" />
          Add This Meal
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onEditPortion}
          aria-label="Edit portion size"
        >
          <Pencil className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
