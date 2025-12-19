
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, TrendingUp, Activity, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
    {
        id: "lose_fat",
        title: "Lose Fat",
        subtitle: "Burn fat and get lean",
        icon: TrendingDown,
    },
    {
        id: "gain_muscle",
        title: "Gain Muscle",
        subtitle: "Build strength and mass",
        icon: TrendingUp,
    },
    {
        id: "maintain",
        title: "Maintain Fitness",
        subtitle: "Stay fit and healthy",
        icon: Activity,
    },
    {
        id: "health",
        title: "Improve Health",
        subtitle: "Focus on overall well-being",
        icon: Heart,
    },
];

export default function GoalSelection() {
    const navigate = useNavigate();
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedGoal) {
            navigate("/onboarding/measurements");
        }
    };

    return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold font-heading text-foreground">What's your goal?</h1>
                    <p className="text-muted-foreground">Select your primary focus to personalize your plan.</p>
                </div>

                <div className="grid gap-4">
                    {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;

                        return (
                            <Card
                                key={goal.id}
                                className={cn(
                                    "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                                    isSelected
                                        ? "border-primary bg-primary/5 shadow-md"
                                        : "border-border hover:border-primary/50"
                                )}
                                onClick={() => setSelectedGoal(goal.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={cn(
                                            "p-3 rounded-full transition-colors",
                                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{goal.title}</h3>
                                        <p className="text-sm text-muted-foreground">{goal.subtitle}</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <Button
                    className="w-full text-lg h-12"
                    size="lg"
                    onClick={handleContinue}
                    disabled={!selectedGoal}
                >
                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
