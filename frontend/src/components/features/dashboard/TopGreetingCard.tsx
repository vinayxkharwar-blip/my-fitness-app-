import { Leaf } from "lucide-react";

interface TopGreetingCardProps {
  userName?: string;
  avatarUrl?: string;
}

const motivationalQuotes = [
  "Small steps today = big results tomorrow",
  "You're building a healthier version of yourself",
  "Progress, not perfection",
  "Every healthy choice is a victory",
  "You're doing amazing, keep going!",
];

export function TopGreetingCard({ userName = "Friend", avatarUrl }: TopGreetingCardProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="flex items-start justify-between gap-4 animate-fade-in">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🌱</span>
          <h1 className="font-display text-hero text-foreground">
            {greeting}
          </h1>
        </div>
        <p className="text-body text-muted-foreground">{quote}</p>
      </div>
      
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${userName}'s avatar`}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
            <Leaf className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
      </div>
    </div>
  );
}
