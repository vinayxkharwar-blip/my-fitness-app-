import { Loader2 } from "lucide-react";

interface LoadingAnalysisProps {
  type: "meal" | "body";
}

export function LoadingAnalysis({ type }: LoadingAnalysisProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
      </div>

      <h3 className="text-subtitle text-foreground mb-2">Analyzing...</h3>
      <p className="text-body text-muted-foreground text-center max-w-xs">
        {type === "meal"
          ? "This takes just a few seconds ✨"
          : "Hang tight, we're processing your photo 😊"
        }
      </p>

      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-pulse-gentle"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
