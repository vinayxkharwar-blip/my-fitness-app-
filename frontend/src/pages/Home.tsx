import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Droplets, Target, ChevronRight, Plus, ScanLine } from "lucide-react";

// Mock Data
const DAILY_STATS = {
    calories: { current: 1250, target: 2200 },
    protein: { current: 95, target: 160 },
    carbs: { current: 140, target: 200 },
    fat: { current: 45, target: 70 },
    water: { current: 1.5, target: 3.0 }, // Liters
};

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in">

            {/* HEADER SECTION */}
            <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-gradient-to-b from-card to-background sticky top-0 z-10 glass-panel border-b-0">
                <div>
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Today, {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</p>
                    <h1 className="text-2xl font-bold font-heading">
                        Hello, <span className="text-primary">Alex</span> 👋
                    </h1>
                </div>
                <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden border border-white/10">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="h-full w-full object-cover" />
                </div>
            </header>

            <main className="px-6 space-y-6">

                {/* CALORIES CARD (HERO) */}
                <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-premium border border-white/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold">Calories</h3>
                            <p className="text-sm text-muted-foreground">Remaining today</p>
                        </div>
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                            <Flame size={20} fill="currentColor" className="opacity-80" />
                        </div>
                    </div>

                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-4xl font-bold text-white">{DAILY_STATS.calories.target - DAILY_STATS.calories.current}</span>
                        <span className="text-muted-foreground mb-1.5">kcal left</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                            style={{ width: `${(DAILY_STATS.calories.current / DAILY_STATS.calories.target) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>{DAILY_STATS.calories.current} eaten</span>
                        <span>{DAILY_STATS.calories.target} goal</span>
                    </div>
                </div>

                {/* MACROS & WATER GRID */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Protein */}
                    <div className="bg-card rounded-3xl p-5 border border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-sm font-medium text-muted-foreground">Protein</span>
                            <Target size={16} className="text-fitness-blue" />
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl font-bold">{DAILY_STATS.protein.current}</span>
                            <span className="text-xs text-muted-foreground"> / {DAILY_STATS.protein.target}g</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full">
                            <div className="h-full bg-fitness-blue rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>

                    {/* Carbs */}
                    <div className="bg-card rounded-3xl p-5 border border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-sm font-medium text-muted-foreground">Carbs</span>
                            <Target size={16} className="text-green-400" />
                        </div>
                        <div className="mb-2">
                            <span className="text-2xl font-bold">{DAILY_STATS.carbs.current}</span>
                            <span className="text-xs text-muted-foreground"> / {DAILY_STATS.carbs.target}g</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                    </div>

                    {/* Hydration */}
                    <div className="bg-card rounded-3xl p-5 border border-white/5 col-span-2 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Droplets size={20} fill="currentColor" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Hydration</h4>
                                <p className="text-xs text-muted-foreground">{DAILY_STATS.water.current}L / {DAILY_STATS.water.target}L goal</p>
                            </div>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                            <Plus size={18} />
                        </Button>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <h3 className="text-lg font-bold pt-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        className="h-auto py-6 flex flex-col items-center gap-3 bg-card border border-white/5 hover:bg-white/5 transition-colors rounded-2xl group"
                        onClick={() => navigate('/scan')}
                    >
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <ScanLine size={24} />
                        </div>
                        <span className="text-sm font-medium">Scan Melody</span>
                    </Button>

                    <Button
                        className="h-auto py-6 flex flex-col items-center gap-3 bg-card border border-white/5 hover:bg-white/5 transition-colors rounded-2xl group"
                        onClick={() => navigate('/log-workout')}
                    >
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <Target size={24} />
                        </div>
                        <span className="text-sm font-medium">Log Workout</span>
                    </Button>
                </div>

            </main>
        </div>
    );
}
