import { Sparkles } from "lucide-react";

interface FocusCardProps {
  focusText?: string;
}

export function FocusCard({ focusText = "Stay hydrated and hit your protein goal today!" }: FocusCardProps) {
  return (
    <div className="fit-card bg-gradient-to-br from-primary/5 to-secondary/5 animate-slide-up" style={{ animationDelay: '50ms' }}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-tiny text-primary font-semibold uppercase tracking-wide mb-1">
            Today's Focus
          </p>
          <p className="text-body-medium text-foreground">
            {focusText}
          </p>
        </div>
      </div>
    </div>
  );
}
