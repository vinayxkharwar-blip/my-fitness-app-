import { TrendingDown, Dumbbell, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/common/button";

interface BodyAnalysisResult {
  bodyFatPercentage: number;
  category: "Lean" | "Normal" | "Overweight";
  recommendation: string;
}

interface BodyAnalysisCardProps {
  result: BodyAnalysisResult;
  onGenerateDietPlan?: () => void;
  onTalkToCoach?: () => void;
}

const categoryColors = {
  Lean: "text-success",
  Normal: "text-primary",
  Overweight: "text-accent",
};

const categoryBgs = {
  Lean: "bg-success/10 border-success/20",
  Normal: "bg-primary/10 border-primary/20",
  Overweight: "bg-accent/10 border-accent/20",
};

export function BodyAnalysisCard({ result, onGenerateDietPlan, onTalkToCoach }: BodyAnalysisCardProps) {
  return (
    <div className="fit-card-elevated space-y-5 animate-scale-up">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-4">
          <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-small text-muted-foreground">Analysis Complete</span>
        </div>
        <p className="text-hero font-display text-foreground">{result.bodyFatPercentage}%</p>
        <p className="text-body text-muted-foreground">Estimated Body Fat</p>
      </div>

      {/* Category badge */}
      <div className={`p-4 rounded-xl border ${categoryBgs[result.category]} text-center`}>
        <span className={`text-subtitle font-semibold ${categoryColors[result.category]}`}>
          {result.category}
        </span>
      </div>

      {/* Recommendation */}
      <div className="p-4 rounded-xl bg-muted/50">
        <p className="text-body text-foreground leading-relaxed">
          {result.recommendation}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="primary-pill"
          size="lg"
          onClick={onGenerateDietPlan}
          className="w-full"
          aria-label="Generate a personalized diet plan"
        >
          <TrendingDown className="w-5 h-5" />
          Generate Diet Plan
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={onTalkToCoach}
          className="w-full"
          aria-label="Talk to a fitness coach"
        >
          <MessageCircle className="w-5 h-5" />
          Talk to Coach
        </Button>
      </div>

      {/* Encouragement */}
      <p className="text-center text-small text-muted-foreground">
        Remember: This is an estimate. You're doing great by taking this step! 💪
      </p>
    </div>
  );
}
