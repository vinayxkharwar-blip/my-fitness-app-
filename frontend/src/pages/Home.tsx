import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useMeals } from "@/hooks/useMeals";
import { useWater } from "@/hooks/useWater";
import { useHabits } from "@/hooks/useHabits";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { 
    Flame, 
    Droplets, 
    Utensils, 
    Zap, 
    Play, 
    MessageSquare, 
    CheckCircle2, 
    Circle, 
    Moon, 
    Activity, 
    Camera, 
    Plus, 
    ChevronRight, 
    ArrowUpRight, 
    Sparkles, 
    Scale,
    Target
} from "lucide-react";
import { cn } from "@/utils/utils";

// Default daily targets
const DEFAULT_TARGETS = {
    calories: 2200,
    protein: 150,
    carbs: 220,
    fat: 65,
    waterGlasses: 8,
};

// Fallback habit list
const DEFAULT_HABITS = [
    { id: 1, name: "Morning Stretch & Mobility", icon: Play, desc: "10 mins mobility routine" },
    { id: 2, name: "Hydrate (500ml upon waking)", icon: Droplets, desc: "Kickstart daily metabolism" },
    { id: 3, name: "Log Nutrition & Macros", icon: Utensils, desc: "Hit daily protein target" },
    { id: 4, name: "Evening Recovery / Walk", icon: Zap, desc: "Active muscle recovery" },
];

export default function Home() {
    const { user } = useAuth();
    const userName = user?.full_name?.split(" ")[0] || "Athlete";

    // ── Fetch actual data from MongoDB ──
    const { meals, isLoading: mealsLoading } = useMeals();
    const { waterLogs, isLoading: waterLoading, addWater } = useWater();
    const { habitLogs, isLoading: habitsLoading, addHabitLog } = useHabits();
    const { profile, isLoading: profileLoading } = useProfile();

    const isLoading = mealsLoading || waterLoading || habitsLoading || profileLoading;

    // ── Dynamic TDEE calculation ──
    const targets = useMemo(() => {
        if (!profile?.weight_kg || !profile?.height_cm || !profile?.age) return DEFAULT_TARGETS;

        const weight = Number(profile.weight_kg);
        const height = Number(profile.height_cm);
        const age = Number(profile.age);
        const activity = profile.activity_level || "moderate";

        // Harris-Benedict formula
        const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        const multipliers: Record<string, number> = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };
        const tdee = Math.round(bmr * (multipliers[activity] || 1.35));

        return {
            calories: tdee,
            protein: Math.round((tdee * 0.30) / 4),
            carbs: Math.round((tdee * 0.40) / 4),
            fat: Math.round((tdee * 0.30) / 9),
            waterGlasses: 8,
        };
    }, [profile]);

    // ── Today's meals filtering ──
    const todayStr = new Date().toISOString().split("T")[0];

    const todayMeals = useMemo(() => {
        if (!Array.isArray(meals)) return [];
        return meals.filter((m: any) => {
            const loggedDate = m.logged_at ? (m.logged_at.split("T")[0] || m.logged_at.split(" ")[0]) : "";
            return loggedDate === todayStr;
        });
    }, [meals, todayStr]);

    const caloriesConsumed = useMemo(() =>
        todayMeals.reduce((sum: number, m: any) => sum + (Number(m.calories) || 0), 0),
        [todayMeals]
    );

    const macrosConsumed = useMemo(() => ({
        protein: todayMeals.reduce((s: number, m: any) => s + (Number(m.protein) || 0), 0),
        carbs: todayMeals.reduce((s: number, m: any) => s + (Number(m.carbs) || 0), 0),
        fat: todayMeals.reduce((s: number, m: any) => s + (Number(m.fats) || 0), 0),
    }), [todayMeals]);

    const recentMeals = useMemo(() => {
        if (!Array.isArray(meals)) return [];
        return [...meals]
            .sort((a: any, b: any) => new Date(b.logged_at || b.createdAt || 0).getTime() - new Date(a.logged_at || a.createdAt || 0).getTime())
            .slice(0, 5);
    }, [meals]);

    // ── Hydration calculation ──
    const todayWaterMl = useMemo(() => {
        if (!Array.isArray(waterLogs)) return 0;
        return waterLogs
            .filter((w: any) => {
                const loggedDate = w.logged_at ? (w.logged_at.split("T")[0] || w.logged_at.split(" ")[0]) : "";
                return loggedDate === todayStr;
            })
            .reduce((sum: number, w: any) => sum + (Number(w.amount_ml) || 0), 0);
    }, [waterLogs, todayStr]);

    const waterGlasses = Math.floor(todayWaterMl / 250);

    // ── Habits calculation ──
    const todayHabitIds = useMemo(() => {
        if (!Array.isArray(habitLogs)) return new Set<number>();
        return new Set(
            habitLogs
                .filter((h: any) => {
                    const loggedDate = h.completed_at ? (h.completed_at.split("T")[0] || h.completed_at.split(" ")[0]) : "";
                    return loggedDate === todayStr;
                })
                .map((h: any) => Number(h.habit_id))
        );
    }, [habitLogs, todayStr]);

    const habits = DEFAULT_HABITS.map(h => ({
        ...h,
        completed: todayHabitIds.has(h.id),
    }));

    // Derived percentages
    const caloriesProgress = Math.min(Math.round((caloriesConsumed / targets.calories) * 100), 100);
    const proteinProgress = Math.min(Math.round((macrosConsumed.protein / targets.protein) * 100), 100);
    const carbsProgress = Math.min(Math.round((macrosConsumed.carbs / targets.carbs) * 100), 100);
    const fatProgress = Math.min(Math.round((macrosConsumed.fat / targets.fat) * 100), 100);
    const waterProgress = Math.min(Math.round((waterGlasses / 8) * 100), 100);

    const todayDateFormatted = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
    });

    // BMI calculation
    const currentWeight = profile?.weight_kg || user?.weight_kg || 70;
    const currentHeight = profile?.height_cm || user?.height_cm || 175;
    const bmi = (currentWeight / ((currentHeight / 100) ** 2)).toFixed(1);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-[#F3F6F8] flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4" />
                <p className="text-slate-500 text-sm font-medium">Synchronizing your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#F3F6F8] text-[#0F172A] font-sans pb-28 md:pb-12">
            <main className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-7">
                
                {/* ────────────────────────────────────────────────────────
                    1. TOP HEADER & GREETING BAR (CLEAN LIGHT)
                ──────────────────────────────────────────────────────── */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-xs font-semibold mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                            {todayDateFormatted.toUpperCase()} • OVERVIEW
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                            Welcome back, <span className="text-[#16A34A]">{userName}</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                            Your daily nutrition, hydration, and AI coaching metrics are synchronized.
                        </p>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/scan"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
                        >
                            <Camera className="w-4 h-4" />
                            <span>AI Snap Meal</span>
                        </Link>
                        <Link
                            to="/log-meal"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4 text-[#16A34A]" />
                            <span>Log Food</span>
                        </Link>
                        <Link
                            to="/coach"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-[#2563EB] font-semibold text-xs sm:text-sm transition-all active:scale-95"
                        >
                            <Sparkles className="w-4 h-4 text-[#2563EB]" />
                            <span>Ask Coach</span>
                        </Link>
                    </div>
                </header>

                {/* ────────────────────────────────────────────────────────
                    2. KEY METRIC SUMMARY STAT CARDS (CLEAN LIGHT 4-COL)
                ──────────────────────────────────────────────────────── */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    
                    {/* CALORIES CARD */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Calories</span>
                            <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#16A34A]">
                                <Flame className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{caloriesConsumed}</span>
                            <span className="text-xs text-[#64748B] font-medium">/ {targets.calories} kcal</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] rounded-full h-2 mb-2 overflow-hidden">
                            <div 
                                className="bg-[#16A34A] h-full rounded-full transition-all duration-500" 
                                style={{ width: `${caloriesProgress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-[#64748B] font-medium">
                            <span>{Math.max(0, targets.calories - caloriesConsumed)} kcal remaining</span>
                            <span className="text-[#16A34A] font-bold">{caloriesProgress}%</span>
                        </div>
                    </div>

                    {/* PROTEIN CARD */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Protein</span>
                            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                                <Utensils className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{macrosConsumed.protein}g</span>
                            <span className="text-xs text-[#64748B] font-medium">/ {targets.protein}g</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] rounded-full h-2 mb-2 overflow-hidden">
                            <div 
                                className="bg-[#2563EB] h-full rounded-full transition-all duration-500" 
                                style={{ width: `${proteinProgress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-[#64748B] font-medium">
                            <span>Muscle recovery target</span>
                            <span className="text-[#2563EB] font-bold">{proteinProgress}%</span>
                        </div>
                    </div>

                    {/* CARBS CARD */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Carbs</span>
                            <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#D97706]">
                                <Zap className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{macrosConsumed.carbs}g</span>
                            <span className="text-xs text-[#64748B] font-medium">/ {targets.carbs}g</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] rounded-full h-2 mb-2 overflow-hidden">
                            <div 
                                className="bg-[#D97706] h-full rounded-full transition-all duration-500" 
                                style={{ width: `${carbsProgress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-[#64748B] font-medium">
                            <span>Workout energy fuel</span>
                            <span className="text-[#D97706] font-bold">{carbsProgress}%</span>
                        </div>
                    </div>

                    {/* FATS CARD */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Healthy Fats</span>
                            <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] flex items-center justify-center text-[#E11D48]">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{macrosConsumed.fat}g</span>
                            <span className="text-xs text-[#64748B] font-medium">/ {targets.fat}g</span>
                        </div>
                        <div className="w-full bg-[#F1F5F9] rounded-full h-2 mb-2 overflow-hidden">
                            <div 
                                className="bg-[#E11D48] h-full rounded-full transition-all duration-500" 
                                style={{ width: `${fatProgress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-[#64748B] font-medium">
                            <span>Cellular & hormonal support</span>
                            <span className="text-[#E11D48] font-bold">{fatProgress}%</span>
                        </div>
                    </div>

                </section>

                {/* ────────────────────────────────────────────────────────
                    3. MAIN DESKTOP 12-COLUMN DUAL PANEL (CLEAN LIGHT)
                ──────────────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                    
                    {/* ── LEFT COLUMN (8 OF 12 COLS) ── */}
                    <div className="lg:col-span-8 flex flex-col gap-7">
                        
                        {/* FEATURE QUICK LAUNCH HUB (6 Cards on desktop) */}
                        <section>
                            <div className="flex items-center justify-between mb-3.5">
                                <h2 className="text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#16A34A]" />
                                    Core Workspaces & Tools
                                </h2>
                                <span className="text-xs text-[#64748B]">Instant AI & fitness access</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                                
                                {/* AI SNAP */}
                                <Link
                                    to="/scan"
                                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-purple-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-purple-600 transition-colors">AI Meal Snap</h3>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                        </div>
                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">Scan plate with vision AI</p>
                                    </div>
                                </Link>

                                {/* COACH CHAT */}
                                <Link
                                    to="/coach"
                                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-green-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#16A34A] transition-colors">AI Coach Chat</h3>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                                        </div>
                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">24/7 fitness guidance</p>
                                    </div>
                                </Link>

                                {/* LOG FOOD */}
                                <Link
                                    to="/log-meal"
                                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-amber-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-amber-600 transition-colors">Log Nutrition</h3>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                                        </div>
                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">Track meals & macros</p>
                                    </div>
                                </Link>

                                {/* WORKOUT PLANS */}
                                <Link
                                    to="/plans"
                                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-rose-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Play className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-rose-600 transition-colors">Workout Plans</h3>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
                                        </div>
                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">Personalized routines</p>
                                    </div>
                                </Link>

                                {/* SLEEP TRACKER */}
                                <Link
                                    to="/sleep"
                                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-indigo-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Moon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-indigo-600 transition-colors">Sleep Tracker</h3>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">Circadian rhythm analysis</p>
                                    </div>
                                </Link>

                                {/* BODY ANALYSIS */}
                                <Link
                                    to="/body"
                                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-cyan-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between min-h-[135px]"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-cyan-600 transition-colors">Body Analysis</h3>
                                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                                        </div>
                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">Composition & BMI metrics</p>
                                    </div>
                                </Link>

                            </div>
                        </section>

                        {/* RECENT MEALS (CLEAN LIGHT CARD) */}
                        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F1F5F9]">
                                <div>
                                    <h2 className="text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
                                        <Utensils className="w-4 h-4 text-[#16A34A]" />
                                        Recent Meals Logged
                                    </h2>
                                    <p className="text-xs text-[#64748B] mt-0.5">Entries recorded in your database</p>
                                </div>
                                <Link 
                                    to="/log-meal" 
                                    className="text-xs font-semibold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 transition-colors"
                                >
                                    <span>View All</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                {recentMeals.length > 0 ? (
                                    recentMeals.map((meal: any) => (
                                        <div 
                                            key={meal.meal_id || meal._id || meal.id} 
                                            className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0 font-bold">
                                                    <Utensils className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-sm text-[#0F172A]">{meal.name}</span>
                                                        {meal.meal_type && (
                                                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-200/60 text-slate-700">
                                                                {meal.meal_type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-[#64748B] font-medium">
                                                        {meal.logged_at ? new Date(meal.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently"}
                                                        {" • "}
                                                        <span className="text-[#16A34A] font-semibold">{meal.calories || 0} kcal</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Macro Badges */}
                                            <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-semibold">
                                                <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                                                    {meal.protein || 0}g P
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                                                    {meal.carbs || 0}g C
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3]">
                                                    {meal.fats || 0}g F
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 flex flex-col items-center justify-center text-center gap-2.5">
                                        <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <Utensils className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#0F172A]">No meals logged yet today</p>
                                            <p className="text-xs text-[#64748B] mt-0.5">Use AI Snap or manual log to start tracking.</p>
                                        </div>
                                        <Link 
                                            to="/log-meal" 
                                            className="mt-1 px-3.5 py-1.5 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-bold transition-all"
                                        >
                                            + Log Your First Meal
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>

                    {/* ── RIGHT COLUMN (4 OF 12 COLS) ── */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        
                        {/* HYDRATION STATION */}
                        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-3.5">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                                        <Droplets className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0F172A]">Hydration Tracker</h3>
                                        <p className="text-xs text-[#64748B]">{todayWaterMl} / 2000 ml ({waterGlasses} of 8 glasses)</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#2563EB]">{waterProgress}%</span>
                            </div>

                            {/* 8-Segment Glass Indicator */}
                            <div className="grid grid-cols-8 gap-1.5 mb-4">
                                {[...Array(8)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "h-7 rounded-lg transition-all duration-200 flex items-center justify-center text-[10px] font-bold",
                                            i < waterGlasses 
                                                ? "bg-[#2563EB] text-white shadow-xs" 
                                                : "bg-[#F1F5F9] text-[#94A3B8]"
                                        )}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>

                            {/* Quick Add Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => addWater(250)}
                                    className="py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                >
                                    <Plus className="w-3.5 h-3.5 text-[#2563EB]" />
                                    <span>+ 250 ml (Glass)</span>
                                </button>
                                <button
                                    onClick={() => addWater(500)}
                                    className="py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-all active:scale-95 flex items-center justify-center gap-1.5"
                                >
                                    <Plus className="w-3.5 h-3.5 text-[#2563EB]" />
                                    <span>+ 500 ml (Bottle)</span>
                                </button>
                            </div>
                        </section>

                        {/* DAILY HABITS */}
                        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-3.5">
                                <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                                    Daily Habits
                                </h3>
                                <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                                    {habits.filter(h => h.completed).length}/{habits.length} Done
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {habits.map((habit) => {
                                    const Icon = habit.icon;
                                    return (
                                        <button
                                            key={habit.id}
                                            onClick={() => {
                                                if (!todayHabitIds.has(habit.id)) {
                                                    addHabitLog(habit.id);
                                                }
                                            }}
                                            className={cn(
                                                "w-full p-3 rounded-xl border flex items-center justify-between transition-all text-left",
                                                habit.completed 
                                                    ? "bg-[#F0FDF4] border-[#BBF7D0] text-[#0F172A]" 
                                                    : "bg-[#F8FAFC] border-[#E2E8F0] hover:bg-slate-100/70 text-[#0F172A]"
                                            )}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className={cn(
                                                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                                                    habit.completed ? "bg-[#16A34A] text-white" : "bg-slate-200 text-slate-500"
                                                )}>
                                                    <Icon className="w-3.5 h-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-[#0F172A]">{habit.name}</p>
                                                    <p className="text-[10px] text-[#64748B]">{habit.desc}</p>
                                                </div>
                                            </div>

                                            {habit.completed ? (
                                                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-slate-300 hover:text-slate-500 shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* AI COACH INSIGHT CARD (PALE GREEN SURFACE) */}
                        <section className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 shadow-xs">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#16A34A] mb-1.5">
                                <Sparkles className="w-4 h-4" />
                                <span>AI COACH ADVISORY</span>
                            </div>
                            <h4 className="text-sm font-bold text-[#0F172A] mb-1.5">
                                {caloriesConsumed < targets.calories * 0.5 
                                    ? "Prioritize balanced nutrition today" 
                                    : "Great progress on your daily target"}
                            </h4>
                            <p className="text-xs text-[#64748B] leading-relaxed mb-3.5">
                                {caloriesConsumed < targets.calories * 0.5
                                    ? `You have logged ${caloriesConsumed} kcal. Remember to hydrate well and fuel your recovery with lean protein.`
                                    : `You have consumed ${caloriesConsumed} kcal today. Maintain steady hydration and prepare for rest.`
                                }
                            </p>
                            <Link
                                to="/coach"
                                className="w-full py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Consult AI Coach</span>
                            </Link>
                        </section>

                        {/* PROFILE & HEALTH METRICS SNAPSHOT */}
                        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-3.5">
                                <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-[#16A34A]" />
                                    Profile Snapshot
                                </h3>
                                <Link to="/profile" className="text-xs text-[#16A34A] hover:underline font-semibold">
                                    Edit
                                </Link>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center mb-3.5">
                                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                    <span className="block text-[10px] uppercase font-bold text-[#64748B]">Weight</span>
                                    <span className="text-sm font-extrabold text-[#0F172A]">{currentWeight} <span className="text-[10px] text-[#64748B] font-normal">kg</span></span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                    <span className="block text-[10px] uppercase font-bold text-[#64748B]">Height</span>
                                    <span className="text-sm font-extrabold text-[#0F172A]">{currentHeight} <span className="text-[10px] text-[#64748B] font-normal">cm</span></span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                    <span className="block text-[10px] uppercase font-bold text-[#64748B]">BMI</span>
                                    <span className="text-sm font-extrabold text-[#16A34A]">{bmi}</span>
                                </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Target className="w-3.5 h-3.5 text-[#16A34A]" />
                                    <span className="text-xs font-semibold text-[#0F172A]">Active Goal</span>
                                </div>
                                <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#BBF7D0]">
                                    {profile?.goal?.replace("_", " ") || user?.goal || "Maintain"}
                                </span>
                            </div>
                        </section>

                    </div>

                </div>

            </main>
        </div>
    );
}
