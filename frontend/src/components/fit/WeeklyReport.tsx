import { TrendingUp, Droplets, Check, Award } from "lucide-react";

interface WeeklyReportProps {
  caloriesData: number[];
  waterData: number[];
  habitsCompleted: number;
  habitsTotal: number;
  bestDay: string;
  streak: number;
}

export function WeeklyReport({
  caloriesData,
  waterData,
  habitsCompleted,
  habitsTotal,
  bestDay,
  streak,
}: WeeklyReportProps) {
  const maxCalories = Math.max(...caloriesData);
  const maxWater = Math.max(...waterData);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const habitPercentage = Math.round((habitsCompleted / habitsTotal) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Message */}
      <div className="fit-card-elevated text-center py-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-3">
          <Award className="w-5 h-5 text-success" aria-hidden="true" />
          <span className="text-body-medium text-success">Weekly Summary</span>
        </div>
        <h2 className="text-title text-foreground font-display mb-2">
          Great job! You stayed consistent this week 🙌
        </h2>
        <p className="text-body text-muted-foreground">
          {streak} day streak! Keep it going.
        </p>
      </div>

      {/* Calories Chart */}
      <div className="fit-card space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" aria-hidden="true" />
          <h3 className="text-subtitle text-foreground">Calorie Intake</h3>
        </div>
        
        <div className="flex items-end justify-between gap-2 h-24">
          {caloriesData.map((cal, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full rounded-t-lg fit-gradient-primary transition-all duration-500"
                style={{ height: `${(cal / maxCalories) * 100}%`, minHeight: '4px' }}
                role="img"
                aria-label={`${days[i]}: ${cal} calories`}
              />
              <span className="text-tiny text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Water Chart */}
      <div className="fit-card space-y-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-secondary" aria-hidden="true" />
          <h3 className="text-subtitle text-foreground">Hydration</h3>
        </div>
        
        <div className="flex items-end justify-between gap-2 h-20">
          {waterData.map((water, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full rounded-t-lg bg-gradient-to-t from-secondary to-secondary/60 transition-all duration-500"
                style={{ height: `${(water / maxWater) * 100}%`, minHeight: '4px' }}
                role="img"
                aria-label={`${days[i]}: ${water}ml water`}
              />
              <span className="text-tiny text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Habits Ring */}
      <div className="fit-card">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeDasharray={`${habitPercentage} 100`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-subtitle font-display text-foreground">{habitPercentage}%</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-5 h-5 text-primary" aria-hidden="true" />
              <h3 className="text-subtitle text-foreground">Habits Completed</h3>
            </div>
            <p className="text-body text-muted-foreground">
              {habitsCompleted} of {habitsTotal} habits this week
            </p>
          </div>
        </div>
      </div>

      {/* Best Day Callout */}
      <div className="fit-card bg-success/5 border-success/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-success/20">
            <Check className="w-5 h-5 text-success" aria-hidden="true" />
          </div>
          <div>
            <p className="text-body-medium text-foreground">Best day: {bestDay}</p>
            <p className="text-small text-muted-foreground">You were on track ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
}
