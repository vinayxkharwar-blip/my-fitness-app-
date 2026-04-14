import { Camera, ScanLine, Dumbbell, Utensils, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/button";

interface QuickActionCardProps {
  onScanMeal?: () => void;
  onBodyAnalysis?: () => void;
  onMyPlans?: () => void;
  onDailyHabits?: () => void;
  onTalkToCoach?: () => void;
}

function ActionTile({ 
  icon: Icon, 
  label, 
  onClick,
  color = "text-primary"
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick?: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="fit-card flex items-center gap-3 p-4 hover:shadow-fit-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-left w-full"
      aria-label={label}
    >
      <div className={`p-2.5 rounded-xl bg-muted ${color}`}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <span className="text-body-medium text-foreground flex-1">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
    </button>
  );
}

export function QuickActionCard({ 
  onScanMeal, 
  onBodyAnalysis, 
  onMyPlans, 
  onDailyHabits, 
  onTalkToCoach 
}: QuickActionCardProps) {
  return (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: '150ms' }}>
      {/* Primary CTA - Scan My Meal */}
      <Button
        variant="primary-pill"
        size="xl"
        onClick={onScanMeal}
        className="w-full gap-3"
        aria-label="Scan my meal for instant nutrition analysis"
      >
        <Camera className="w-6 h-6" aria-hidden="true" />
        <div className="text-left">
          <span className="block font-semibold">Scan My Meal</span>
          <span className="block text-tiny opacity-90">Instant nutrition analysis</span>
        </div>
      </Button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ActionTile 
          icon={ScanLine} 
          label="Body Analysis" 
          onClick={onBodyAnalysis}
          color="text-secondary"
        />
        <ActionTile 
          icon={Utensils} 
          label="My Plans" 
          onClick={onMyPlans}
          color="text-success"
        />
        <ActionTile 
          icon={Dumbbell} 
          label="Daily Habits" 
          onClick={onDailyHabits}
          color="text-accent"
        />
        <ActionTile 
          icon={MessageCircle} 
          label="Talk to Coach" 
          onClick={onTalkToCoach}
          color="text-rose-500"
        />
      </div>
    </div>
  );
}
