import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingDown, TrendingUp, Activity, Heart, ArrowRight, Check } from "lucide-react";
import { cn } from "@/utils/utils";
import { useProfile } from "@/hooks/useProfile";

const goals = [
    {
        id: "lose_fat",
        title: "Lose Fat",
        subtitle: "Burn fat and get lean",
        icon: TrendingDown,
        tags: [
            { text: "Calorie Deficit", color: "text-[#f97316] bg-[#f97316]/10" },
            { text: "Cardio", color: "text-[#34d399] bg-[#34d399]/10" }
        ]
    },
    {
        id: "gain_muscle",
        title: "Gain Muscle",
        subtitle: "Build strength and mass",
        icon: TrendingUp,
        tags: [
            { text: "High Protein", color: "text-[#3b82f6] bg-[#3b82f6]/10" },
            { text: "Strength", color: "text-[#34d399] bg-[#34d399]/10" }
        ]
    },
    {
        id: "maintain",
        title: "Maintain Fitness",
        subtitle: "Stay fit and healthy",
        icon: Activity,
        tags: [
            { text: "Balanced", color: "text-[#34d399] bg-[#34d399]/10" },
            { text: "Wellness", color: "text-[#a855f7] bg-[#a855f7]/10" }
        ]
    },
    {
        id: "health",
        title: "Improve Health",
        subtitle: "Focus on overall well-being",
        icon: Heart,
        tags: [
            { text: "Holistic", color: "text-[#a855f7] bg-[#a855f7]/10" },
            { text: "Sleep & Stress", color: "text-[#3b82f6] bg-[#3b82f6]/10" }
        ]
    },
];

export default function GoalSelection() {
    const navigate = useNavigate();
    const [selectedGoal, setSelectedGoal] = useState<string | null>("lose_fat");
    const { updateProfile, isUpdating } = useProfile();

    const handleContinue = () => {
        if (selectedGoal) {
            updateProfile({ goal: selectedGoal }, {
                onSuccess: () => navigate("/onboarding/measurements"),
                onError: () => navigate("/onboarding/measurements") // Proceed anyway for better UX in case of draft profile
            });
        }
    };

    return (
        <div className="min-h-[100dvh] w-full bg-[#0b0f1a] flex flex-col items-center p-6 relative overflow-hidden font-sans">

            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#34d399] opacity-[0.07] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-[390px] mx-auto flex flex-col flex-1 relative z-10 pt-[28px]">

                {/* Status bar area would go here if needed */}

                {/* Hero section */}
                <div className="flex flex-col items-center text-center space-y-6 mb-8 w-full">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-center gap-2">
                        {/* Completed step */}
                        <div className="h-1.5 w-[24px] rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                        {/* Active step */}
                        <div className="h-1.5 w-[32px] rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                        {/* Remaining steps */}
                        <div className="h-1.5 w-[16px] rounded-full bg-white/10"></div>
                        <div className="h-1.5 w-[16px] rounded-full bg-white/10"></div>
                    </div>

                    {/* Logo Mark */}
                    <div className="w-[52px] h-[52px] rounded-[16px] relative flex items-center justify-center bg-gradient-to-br from-[#10b981] to-[#047857] shadow-[0_0_28px_rgba(52,211,153,0.4)]">
                        {/* Faint outer ring */}
                        <div className="absolute inset-[-4px] rounded-[20px] border border-white/10 pointer-events-none"></div>
                        <Activity className="w-6 h-6 text-[#064e3b] stroke-[2.5]" />
                    </div>

                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#34d399]/15 text-[#34d399] text-[10px] font-bold tracking-widest uppercase">
                            STEP 2 OF 4
                        </div>

                        <div>
                            <h1 className="text-[2.2rem] leading-tight font-bold font-heading text-[#f5f0e8] tracking-tight">
                                What's your<br />
                                <span className="text-[#34d399] italic font-normal">goal?</span>
                            </h1>
                        </div>

                        <p className="text-[#6b7a99] text-[0.85rem] font-light max-w-xs mx-auto">
                            Choose your primary focus. We'll tailor your nutrition and workout plan accordingly.
                        </p>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="flex flex-col gap-[10px] w-full px-4 flex-1">
                    {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;

                        return (
                            <div
                                key={goal.id}
                                className={cn(
                                    "relative flex items-center p-[18px] rounded-[20px] cursor-pointer transition-all duration-300 border backdrop-blur-md overflow-hidden",
                                    isSelected
                                        ? "bg-[#1a2035] border-[#34d399]/40"
                                        : "bg-[#141927] border-white/[0.07] hover:border-white/20"
                                )}
                                onClick={() => setSelectedGoal(goal.id)}
                            >
                                {/* Selected state effects */}
                                {isSelected && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#34d399]/[0.06] to-transparent pointer-events-none" />
                                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(52,211,153,0.05)] pointer-events-none rounded-[20px]" />
                                    </>
                                )}

                                <div className="flex items-center gap-4 relative z-10 w-full">
                                    {/* Icon Wrap */}
                                    <div className="w-[50px] h-[50px] rounded-2xl bg-[#0b0f1a] border border-white/5 flex items-center justify-center shrink-0">
                                        <Icon className={cn("w-6 h-6 transition-colors duration-300", isSelected ? "text-[#34d399]" : "text-[#6b7a99]")} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-[#f5f0e8] text-[0.95rem]">
                                            {goal.title}
                                        </h3>
                                        <p className="text-[0.75rem] text-[#6b7a99] mt-0.5 truncate">{goal.subtitle}</p>

                                        {/* Tags */}
                                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                                            {goal.tags.map((tag, i) => (
                                                <span key={i} className={cn("text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap", tag.color)}>
                                                    {tag.text}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Check indicator */}
                                    <div className={cn(
                                        "w-[22px] h-[22px] rounded-full border shrink-0 flex items-center justify-center transition-all duration-300",
                                        isSelected
                                            ? "border-[#34d399] bg-[#34d399]"
                                            : "border-white/20 bg-transparent"
                                    )}>
                                        {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 mb-4 px-4 w-full">
                    <button
                        className={cn(
                            "w-full h-14 rounded-[16px] font-bold text-[#064e3b] text-base flex items-center justify-center transition-all duration-300",
                            selectedGoal
                                ? "bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_28px_rgba(52,211,153,0.35)] hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(52,211,153,0.45)]"
                                : "bg-white/5 text-[#6b7a99] cursor-not-allowed"
                        )}
                        onClick={handleContinue}
                        disabled={!selectedGoal || isUpdating}
                    >
                        {isUpdating ? "Saving..." : "Continue"} {!isUpdating && <ArrowRight className="ml-2 w-5 h-5" />}
                    </button>
                </div>

            </div>
        </div>
    );
}
