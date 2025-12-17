import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame, Droplets, Trophy, ArrowRight, Zap, Plus, Sparkles } from "lucide-react";
import { ProgressRing } from "../components/ProgressRing";

// Mock Data
const DAILY_STATS = {
    calories: { current: 1250, target: 2200 },
    protein: { current: 95, target: 160 },
    carbs: { current: 140, target: 200 },
    fat: { current: 45, target: 70 },
    water: { current: 1200, target: 2500 }, // ml
};

export default function Home() {
    const navigate = useNavigate();

    // Calculate percentage for the ring
    const caloriesProgress = Math.min((DAILY_STATS.calories.current / DAILY_STATS.calories.target) * 100, 100);

    return (
        <div className="min-h-screen w-full bg-background pb-32 text-foreground font-sans selection:bg-primary/30">

            {/* HEADER SECTION */}
            <header className="px-6 pt-12 pb-6 flex justify-between items-end bg-background/50 backdrop-blur-sm sticky top-0 z-10 border-b border-border/40">
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Today, Dec 17</p>
                    <h1 className="text-2xl font-bold font-heading tracking-tight text-foreground">
                        Time to crush it, <span className="text-primary truncate">Alex</span>
                    </h1>
                </div>
                <Link to="/profile" className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform overflow-hidden">
                    <img src="https://i.pravatar.cc/300?img=5" alt="Profile" className="h-full w-full object-cover" />
                </Link>
            </header>

            <main className="px-6 flex flex-col gap-6 mt-6">

                {/* HERO CARD: Clean Light Premium */}
                <div className="bg-card rounded-[2rem] p-8 shadow-premium mb-6 flex flex-col items-center justify-center relative overflow-hidden animate-scale-in border border-border/20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></div>

                    {/* Background decoration */}
                    <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-purple-500/5 rounded-full blur-3xl"></div>

                    {/* Circular Progress (Simplified Visual for Light Theme) */}
                    <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                        {/* Background Circle */}
                        <div className="absolute inset-0 rounded-full border-[12px] border-slate-100 dark:border-slate-800"></div>
                        {/* Active Progress Circle */}
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                            <circle
                                cx="96" cy="96" r="84"
                                fill="none" stroke="currentColor" strokeWidth="12"
                                strokeDasharray="527" strokeDashoffset="200"
                                strokeLinecap="round"
                                className="text-primary drop-shadow-md"
                            />
                        </svg>

                        <div className="text-center z-10 flex flex-col items-center">
                            <h3 className="text-5xl font-bold text-foreground font-heading tracking-tight">1,250</h3>
                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mt-2">Kcal Left</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2 bg-secondary/50 px-4 py-2 rounded-full">
                        <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
                        <span className="text-sm font-semibold text-foreground">Goal: 2,000</span>
                    </div>
                </div>

                {/* MACROS - Clean Horizontal Bars */}
                <div className="bg-card rounded-[2rem] p-6 shadow-premium mb-6 animate-fade-in-up border border-border/20" style={{ animationDelay: "100ms" }}>
                    <h3 className="text-lg font-bold text-foreground mb-6">Today's Macros</h3>
                    <div className="space-y-6">
                        {/* Carbs */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-foreground">Carbs</span>
                                <span className="text-muted-foreground">{DAILY_STATS.carbs.current}g / {DAILY_STATS.carbs.target}g</span>
                            </div>
                            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[70%] rounded-full shadow-glow-purple"></div>
                            </div>
                        </div>

                        {/* Protein */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-foreground">Protein</span>
                                <span className="text-muted-foreground">{DAILY_STATS.protein.current}g / {DAILY_STATS.protein.target}g</span>
                            </div>
                            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[60%] rounded-full shadow-lg shadow-indigo-500/30"></div>
                            </div>
                        </div>

                        {/* Fat */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-foreground">Fat</span>
                                <span className="text-muted-foreground">{DAILY_STATS.fat.current}g / {DAILY_STATS.fat.target}g</span>
                            </div>
                            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-sky-500 w-[65%] rounded-full shadow-lg shadow-sky-500/30"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HYDRATION ROW */}
                <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/60 flex items-center justify-between w-full shrink-0 text-card-foreground">
                    <div className="flex items-center gap-4">
                        <div className="bg-fitness-water/10 h-10 w-10 flex items-center justify-center rounded-xl text-fitness-water">
                            <Droplets size={20} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-foreground">Hydration</div>
                            <div className="text-xs text-muted-foreground">{DAILY_STATS.water.current} / {DAILY_STATS.water.target} ml</div>
                        </div>
                    </div>

                    <Button size="icon" className="h-10 w-10 rounded-full bg-fitness-water/20 text-fitness-water hover:bg-fitness-water/30 shadow-none border border-fitness-water/20">
                        <Plus size={20} />
                    </Button>
                </div>

                {/* AI SUGGESTION GLASS CARD */}
                <div className="glass-panel rounded-2xl p-5 border-l-4 border-primary shadow-glow animate-slide-up bg-primary/5 w-full shrink-0">
                    <div className="flex gap-3 items-start">
                        <div className="mt-0.5">
                            <Sparkles size={18} className="text-primary animate-pulse" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-primary mb-1">Coach Insight</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                You've been crushing your cardio this week! 🏃‍♂️ I've slightly increased your
                                <span className="text-foreground font-semibold"> Protein</span> target by 10g to help with recovery.
                            </p>
                        </div>
                    </div>
                </div>

                {/* TODAY'S FOCUS (Compact) */}
                <div className="bg-secondary/30 rounded-xl p-3 flex items-center justify-between border border-border/40 w-full shrink-0">
                    <div className="flex items-center gap-2">
                        <Trophy size={14} className="text-yellow-500" />
                        <span className="text-xs font-medium text-foreground">Focus: <span className="text-muted-foreground">Hit 160g Protein</span></span>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground" />
                </div>

            </main>
        </div>
    );
}
