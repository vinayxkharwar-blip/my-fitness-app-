import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame, Droplets, Trophy, ArrowRight, Zap, Plus, Sparkles, Dumbbell } from "lucide-react";
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
            {/* HEADER SECTION - Dark Slate */}
            <header className="px-6 pt-12 pb-8 flex justify-between items-end bg-slate-800 sticky top-0 z-10 shadow-md">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-600/20 p-1.5 rounded-lg">
                            <Dumbbell className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-lg font-bold font-heading text-white tracking-tight">FitSnap</span>
                    </div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Today, Dec 17</p>
                    <h1 className="text-2xl font-bold font-heading tracking-tight text-white">
                        Time to crush it, <span className="text-blue-400 truncate">Alex</span>
                    </h1>
                </div>
                <Link to="/profile" className="h-12 w-12 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-600 shadow-md cursor-pointer hover:scale-105 transition-transform overflow-hidden">
                    <img src="https://i.pravatar.cc/300?img=5" alt="Profile" className="h-full w-full object-cover" />
                </Link>
            </header>

            <main className="px-6 flex flex-col gap-6 mt-6">

                {/* HERO CARD: Dark Slate Focus */}
                <div className="bg-slate-800 rounded-[2rem] p-8 shadow-xl shadow-slate-900/10 mb-6 flex flex-col items-center justify-center relative overflow-hidden animate-scale-in border border-slate-700/50">

                    {/* Circular Progress (Dark Theme) */}
                    <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                        {/* Background Circle */}
                        <div className="absolute inset-0 rounded-full border-[12px] border-slate-700"></div>
                        {/* Active Progress Circle */}
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                            <circle
                                cx="96" cy="96" r="84"
                                fill="none" stroke="currentColor" strokeWidth="12"
                                strokeDasharray="527" strokeDashoffset="200"
                                strokeLinecap="round"
                                className="text-blue-500 drop-shadow-md"
                            />
                        </svg>

                        <div className="text-center z-10 flex flex-col items-center">
                            <h3 className="text-5xl font-bold text-white font-heading tracking-tight">1,250</h3>
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mt-2">Kcal Left</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2 bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600/50">
                        <Flame className="h-4 w-4 text-orange-400" fill="currentColor" />
                        <span className="text-sm font-semibold text-slate-200">Goal: 2,000</span>
                    </div>
                </div>

                {/* MACROS - Clean Horizontal Bars */}
                {/* MACROS - Clean Horizontal Bars */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Today's Macros</h3>
                    <div className="space-y-6">
                        {/* Carbs */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-slate-700">Carbs</span>
                                <span className="text-slate-500">{DAILY_STATS.carbs.current}g / {DAILY_STATS.carbs.target}g</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[70%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Protein */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-slate-700">Protein</span>
                                <span className="text-slate-500">{DAILY_STATS.protein.current}g / {DAILY_STATS.protein.target}g</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[60%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Fat */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-slate-700">Fat</span>
                                <span className="text-slate-500">{DAILY_STATS.fat.current}g / {DAILY_STATS.fat.target}g</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-sky-500 w-[65%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HYDRATION ROW */}
                {/* HYDRATION ROW */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between w-full shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 h-10 w-10 flex items-center justify-center rounded-xl text-blue-500">
                            <Droplets size={20} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-800">Hydration</div>
                            <div className="text-xs text-slate-500">{DAILY_STATS.water.current} / {DAILY_STATS.water.target} ml</div>
                        </div>
                    </div>

                    <Button size="icon" className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-none border border-blue-100">
                        <Plus size={20} />
                    </Button>
                </div>

                {/* AI SUGGESTION CARD */}
                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 shadow-sm animate-slide-up w-full shrink-0">
                    <div className="flex gap-3 items-start">
                        <div className="mt-0.5">
                            <Sparkles size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-700 mb-1">Coach Insight</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                You've been crushing your cardio this week! 🏃‍♂️ I've slightly increased your
                                <span className="text-slate-900 font-semibold"> Protein</span> target by 10g to help with recovery.
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
