import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Flame, Droplets, Utensils, Zap, Play, MessageSquare, CheckCircle2, Circle, Moon, Activity } from "lucide-react";
import { cn } from "@/utils/utils";

// Mock Data
const DAILY_STATS = {
    calories: { current: 1250, target: 2200 },
    macros: {
        protein: { current: 95, target: 160 },
        carbs: { current: 140, target: 200 },
        fat: { current: 45, target: 70 },
    },
    water: { current: 4, target: 8 }, // glasses
    habits: [
        { id: 1, name: "Morning Stretch", icon: Play, completed: true },
        { id: 2, name: "Drink Water", icon: Droplets, completed: true },
        { id: 3, name: "Log Lunch", icon: Utensils, completed: false },
        { id: 4, name: "Read 10 mins", icon: Zap, completed: false },
    ],
    recentMeals: [
        { id: 1, name: "Grilled Chicken Salad", time: "1:30 PM", cals: 450, macros: { p: 40, c: 15, f: 12 } },
        { id: 2, name: "Oatmeal with Berries", time: "8:45 AM", cals: 320, macros: { p: 12, c: 45, f: 8 } },
        { id: 3, name: "Protein Shake", time: "11:00 AM", cals: 180, macros: { p: 25, c: 5, f: 2 } },
    ]
};

export default function Home() {
    const { user } = useAuth();
    const userName = user?.full_name?.split(" ")[0] || "Athlete";

    const [waterGlasses, setWaterGlasses] = useState(DAILY_STATS.water.current);
    const [habits, setHabits] = useState(DAILY_STATS.habits);

    const caloriesProgress = Math.min((DAILY_STATS.calories.current / DAILY_STATS.calories.target) * 100, 100);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    const toggleHabit = (id: number) => {
        setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0A0A] pb-32 text-white font-sans selection:bg-[#22C55E]/30">

            <main className="max-w-lg mx-auto w-full px-6 flex flex-col gap-6 pt-6">

                {/* HERO CARD: Daily Mission Briefing */}
                <section className="glass-card p-6 flex flex-col relative overflow-hidden animate-fade-in-up">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#22C55E]/10 rounded-full blur-[50px] pointer-events-none" />

                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-xs font-semibold text-[#22C55E] tracking-widest uppercase mb-1">{today}</p>
                            <h1 className="text-3xl font-heading font-extrabold tracking-tight">
                                Good morning,<br /><span className="text-white">{userName}</span> 💪
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Circular Progress Ring */}
                        <div className="relative w-32 h-32 shrink-0 flex flex-col items-center justify-center shadow-premium rounded-full bg-[#0A0A0A]/50">
                            <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                <circle cx="64" cy="64" r="54" fill="none" stroke="#1C1C1C" strokeWidth="8" />
                                <circle
                                    cx="64" cy="64" r="54"
                                    fill="none" stroke="currentColor" strokeWidth="8"
                                    strokeDasharray="339.292"
                                    strokeDashoffset={339.292 - (339.292 * caloriesProgress) / 100}
                                    strokeLinecap="round"
                                    className="text-[#22C55E] transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <Flame className="w-5 h-5 text-[#22C55E] mb-0.5 shadow-glow-purple" fill="currentColor" />
                            <span className="text-2xl font-extrabold font-heading">{DAILY_STATS.calories.current}</span>
                            <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">/ {DAILY_STATS.calories.target} kcal</span>
                        </div>

                        {/* Macro Summary Strip */}
                        <div className="flex-1 flex flex-col justify-center gap-3">
                            <MacroPill
                                label="Protein"
                                current={DAILY_STATS.macros.protein.current}
                                target={DAILY_STATS.macros.protein.target}
                                colorClass="bg-blue-500"
                                bgClass="bg-blue-500/10"
                            />
                            <MacroPill
                                label="Carbs"
                                current={DAILY_STATS.macros.carbs.current}
                                target={DAILY_STATS.macros.carbs.target}
                                colorClass="bg-amber-500"
                                bgClass="bg-amber-500/10"
                            />
                            <MacroPill
                                label="Fat"
                                current={DAILY_STATS.macros.fat.current}
                                target={DAILY_STATS.macros.fat.target}
                                colorClass="bg-rose-500"
                                bgClass="bg-rose-500/10"
                            />
                        </div>
                    </div>
                </section>

                {/* HYDRATION TRACKER */}
                <section className="glass-card p-5 flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Droplets size={16} fill="currentColor" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">Hydration</h3>
                                <p className="text-xs text-zinc-500">{waterGlasses} / 8 glasses (250ml)</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setWaterGlasses(Math.min(8, waterGlasses + 1))}
                            className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-110 active:scale-95 transition-all"
                        >
                            +
                        </button>
                    </div>
                    {/* Water progress bar */}
                    <div className="flex gap-1 h-3">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={cn(
                                "flex-1 rounded-sm transition-colors duration-300",
                                i < waterGlasses ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" : "bg-zinc-800"
                            )} />
                        ))}
                    </div>
                </section>

                {/* QUICK ACTIONS GRID */}
                <section className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                    <Link to="/log-meal" className="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 group">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors">
                            <Utensils size={24} />
                        </div>
                        <span className="text-sm font-semibold">Log Meal</span>
                    </Link>
                    <Link to="/coach" className="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 group">
                        <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center group-hover:bg-[#22C55E] group-hover:text-black transition-colors shadow-glow-purple group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                            <MessageSquare size={24} />
                        </div>
                        <span className="text-sm font-semibold text-[#22C55E]">Coach Chat</span>
                    </Link>
                    <Link to="/scan" className="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 group">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Flame size={24} />
                        </div>
                        <span className="text-sm font-semibold">AI Snap</span>
                    </Link>
                    <Link to="/plans" className="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 group">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <Play size={24} />
                        </div>
                        <span className="text-sm font-semibold">Start Workout</span>
                    </Link>
                    <Link to="/sleep" className="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 group">
                        <div className="w-12 h-12 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] flex items-center justify-center group-hover:bg-[#a78bfa] group-hover:text-white transition-colors">
                            <Moon size={24} />
                        </div>
                        <span className="text-sm font-semibold text-[#a78bfa]">Sleep Tracker</span>
                    </Link>
                    <Link to="/body" className="glass-card p-4 flex flex-col items-center justify-center gap-3 active:scale-95 group">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                            <Activity size={24} />
                        </div>
                        <span className="text-sm font-semibold">Body Analysis</span>
                    </Link>
                </section>

                {/* TODAY'S HABITS */}
                <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-heading font-bold">Today's Habits</h2>
                        <span className="text-xs text-[#22C55E] font-medium">{habits.filter(h => h.completed).length}/{habits.length} Done</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
                        {habits.map((habit) => {
                            const Icon = habit.icon;
                            return (
                                <button
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={cn(
                                        "shrink-0 w-36 glass-card p-4 flex flex-col items-start gap-4 transition-all duration-300 text-left",
                                        habit.completed ? "border-[#22C55E]/50 bg-[#22C55E]/5" : ""
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                            habit.completed ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-zinc-800 text-zinc-400"
                                        )}>
                                            <Icon size={14} />
                                        </div>
                                        {habit.completed ? (
                                            <CheckCircle2 size={20} className="text-[#22C55E]" />
                                        ) : (
                                            <Circle size={20} className="text-zinc-600" />
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium leading-tight",
                                        habit.completed ? "text-white" : "text-zinc-400"
                                    )}>
                                        {habit.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* RECENT ACTIVITY */}
                <section className="animate-fade-in-up mb-8" style={{ animationDelay: "250ms" }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-heading font-bold">Recent Meals</h2>
                        <Link to="/log-meal" className="text-xs text-[#22C55E] font-semibold hover:underline">View All</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {DAILY_STATS.recentMeals.map((meal) => (
                            <div key={meal.id} className="glass-card p-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-white">{meal.name}</span>
                                    <span className="text-xs text-zinc-500 font-medium">{meal.time} • {meal.cals} kcal</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">{meal.macros.p}p</span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">{meal.macros.c}c</span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">{meal.macros.f}f</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}

// Helper component for Maco Pills
function MacroPill({ label, current, target, colorClass, bgClass }: { label: string, current: number, target: number, colorClass: string, bgClass: string }) {
    const pct = Math.min((current / target) * 100, 100);
    return (
        <div className="flex items-center gap-3 w-full pl-2">
            <div className="w-10">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className={cn("flex-1 h-3 rounded-full overflow-hidden", bgClass)}>
                <div className={cn("h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]", colorClass)} style={{ width: `${pct}%` }} />
            </div>
            <div className="w-14 text-right">
                <span className="text-xs font-bold text-white">{current}<span className="text-zinc-600 font-medium">/{target}</span></span>
            </div>
        </div>
    );
}
