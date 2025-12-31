import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, TrendingUp, Activity, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
    {
        id: "lose_fat",
        title: "Lose Fat",
        subtitle: "Burn fat and get lean",
        icon: TrendingDown,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "group-hover:border-orange-500/50"
    },
    {
        id: "gain_muscle",
        title: "Gain Muscle",
        subtitle: "Build strength and mass",
        icon: TrendingUp,
        color: "text-blue-500", // Keep variety or unify? Let's unify for premium feel or use complementary
        bgColor: "bg-blue-500/10",
        borderColor: "group-hover:border-blue-500/50"
    },
    {
        id: "maintain",
        title: "Maintain Fitness",
        subtitle: "Stay fit and healthy",
        icon: Activity,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        borderColor: "group-hover:border-green-500/50"
    },
    {
        id: "health",
        title: "Improve Health",
        subtitle: "Focus on overall well-being",
        icon: Heart,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "group-hover:border-red-500/50"
    },
];

export default function GoalSelection() {
    const navigate = useNavigate();
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    const handleContinue = async () => {
        if (selectedGoal) {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    const userId = user.id || user.user_id;

                    await fetch("http://localhost:5000/profile/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: userId,
                            goal: selectedGoal
                        })
                    });
                }
            } catch (err) {
                console.error("Failed to save goal", err);
            }
            navigate("/onboarding/measurements");
        }
    };

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden font-sans selection:bg-orange-500/30">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-zinc-900 to-black pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-zinc-900/50 border border-white/5 mb-4 shadow-lg">
                        <Activity className="w-6 h-6 text-orange-500" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-white tracking-tight">What's your goal?</h1>
                    <p className="text-gray-400 text-lg">Select your primary focus to personalize your plan.</p>
                </div>

                <div className="grid gap-4">
                    {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;

                        return (
                            <div
                                key={goal.id}
                                className={cn(
                                    "group relative flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md overflow-hidden",
                                    isSelected
                                        ? "bg-zinc-900/80 border-orange-500/50 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)] scale-[1.02]"
                                        : "bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                                )}
                                onClick={() => setSelectedGoal(goal.id)}
                            >
                                {/* Selection Glow */}
                                {isSelected && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
                                )}

                                <div
                                    className={cn(
                                        "p-3.5 rounded-xl transition-colors duration-300 border border-transparent",
                                        isSelected
                                            ? "bg-orange-500 text-white shadow-lg"
                                            : "bg-zinc-800 text-gray-400 group-hover:text-white group-hover:bg-zinc-700"
                                    )}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>

                                <div className="flex-1 relative z-10">
                                    <h3 className={cn("font-bold text-lg transition-colors", isSelected ? "text-white" : "text-gray-200")}>
                                        {goal.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium">{goal.subtitle}</p>
                                </div>

                                {isSelected && (
                                    <div className="animate-in fade-in zoom-in duration-200">
                                        <CheckCircle2 className="w-6 h-6 text-orange-500" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <Button
                    className={cn(
                        "w-full h-14 text-lg rounded-full font-bold tracking-wide transition-all duration-300 shadow-lg",
                        selectedGoal
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-orange-900/20 hover:scale-[1.02] hover:shadow-orange-900/40"
                            : "bg-zinc-800 text-gray-500 cursor-not-allowed"
                    )}
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
