import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame, Droplets, Trophy, ScanLine, ArrowRight, Activity, Dumbbell, Utensils, Plus } from "lucide-react";

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

    return (
        <div className="min-h-screen w-full bg-slate-50 pb-32 text-slate-900 animate-fade-in font-sans">

            {/* HEADER SECTION */}
            <header className="px-6 pt-12 pb-2 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-heading tracking-tight text-slate-800">
                        Good Afternoon,<br /> <span className="text-primary">Friend!</span>
                    </h1>
                    <p className="text-sm font-medium text-slate-500">Let's make today count. ✨</p>
                </div>

            </header>

            <main className="px-6 space-y-6 mt-4">

                {/* TODAY'S FOCUS CARD */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-xl text-orange-500">
                            <Trophy size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Focus</p>
                            <p className="text-sm font-semibold text-slate-800">Hit your protein goal 💪</p>
                        </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300" />
                </div>

                {/* CALORIES SUMMARY (HERO) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Calories Remaining</h2>
                            <p className="text-sm text-slate-500">Daily Target: {DAILY_STATS.calories.target}</p>
                        </div>
                        <div className="bg-red-50 p-2 rounded-full text-red-500">
                            <Flame size={20} fill="currentColor" className="opacity-80" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-5xl font-black text-slate-900 tracking-tight">
                                {DAILY_STATS.calories.target - DAILY_STATS.calories.current}
                            </span>
                            <span className="text-sm font-medium text-slate-400">kcal left</span>
                        </div>
                        {/* Main Progress Bar */}
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                                style={{ width: `${(DAILY_STATS.calories.current / DAILY_STATS.calories.target) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Macros Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {/* Protein */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <span>Protein</span>
                                <span>{DAILY_STATS.protein.current}g</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        {/* Carbs */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <span>Carbs</span>
                                <span>{DAILY_STATS.carbs.current}g</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                        {/* Fat */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <span>Fats</span>
                                <span>{DAILY_STATS.fat.current}g</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="ghost"
                            className="bg-white h-auto py-4 rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 flex flex-col gap-2 items-center justify-center transition-all hover:scale-[1.02]"
                            onClick={() => navigate('/scan')}
                        >
                            <div className="bg-purple-50 p-3 rounded-full text-purple-600">
                                <ScanLine size={24} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Scan Meal</span>
                        </Button>

                        <Button
                            variant="ghost"
                            className="bg-white h-auto py-4 rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 flex flex-col gap-2 items-center justify-center transition-all hover:scale-[1.02]"
                            onClick={() => navigate('/body')}
                        >
                            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                                <Activity size={24} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Body Check</span>
                        </Button>

                        <Button
                            variant="ghost"
                            className="bg-white h-auto py-4 rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 flex flex-col gap-2 items-center justify-center transition-all hover:scale-[1.02]"
                            onClick={() => navigate('/scan')}
                        >
                            <div className="bg-green-50 p-3 rounded-full text-green-600">
                                <Utensils size={24} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Log Food</span>
                        </Button>

                        <Button
                            variant="ghost"
                            className="bg-white h-auto py-4 rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 flex flex-col gap-2 items-center justify-center transition-all hover:scale-[1.02]"
                            onClick={() => navigate('/plans')}
                        >
                            <div className="bg-orange-50 p-3 rounded-full text-orange-600">
                                <Dumbbell size={24} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">Workout</span>
                        </Button>
                    </div>
                </div>

                {/* HYDRATION CARD */}
                <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-cyan-50 p-2.5 rounded-full text-cyan-500">
                            <Droplets size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Hydration</h4>
                            <p className="text-xs text-slate-500">Stay hydrated!</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 rounded-full border-cyan-100 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 flex items-center gap-1 text-xs">
                                <Plus size={12} /> 200ml
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 rounded-full border-cyan-100 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 flex items-center gap-1 text-xs">
                                <Plus size={12} /> 500ml
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end text-sm">
                            <span className="font-bold text-slate-700">{DAILY_STATS.water.current} / {DAILY_STATS.water.target} ml</span>
                            <span className="font-bold text-cyan-500">48%</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '48%' }}></div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
