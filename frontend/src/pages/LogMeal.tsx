import React, { useState, useRef, useMemo } from "react";
import { ChevronDown, ChevronUp, Plus, Camera, X, Loader2, Check } from "lucide-react";
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMeals } from "@/hooks/useMeals";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/utils/utils";

const DATES = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i);
    return {
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate(),
        isToday: i === 3,
        id: d.toISOString().split("T")[0]
    };
});

export default function LogMeal() {
    const [selectedDate, setSelectedDate] = useState(DATES[3].id);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        Breakfast: true,
        Lunch: true,
        Dinner: true,
        Snacks: true
    });

    const { meals, addMeal } = useMeals();

    // Manual Entry Form State
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);
    const [manualName, setManualName] = useState("");
    const [manualCals, setManualCals] = useState("");
    const [manualProtein, setManualProtein] = useState("");
    const [manualCarbs, setManualCarbs] = useState("");
    const [manualFats, setManualFats] = useState("");
    const [manualType, setManualType] = useState("lunch");
    const [submittingManual, setSubmittingManual] = useState(false);

    // AI Analysis State
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState<{
        name: string;
        cals: number;
        protein: number;
        carbs: number;
        fats: number;
    } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Filter meals for selected date
    const filteredMeals = useMemo(() => {
        if (!Array.isArray(meals)) return [];
        return meals.filter((m: any) => {
            const loggedDate = m.logged_at ? (m.logged_at.split("T")[0] || m.logged_at.split(" ")[0]) : "";
            return loggedDate === selectedDate || !m.logged_at;
        });
    }, [meals, selectedDate]);

    // Group meals by type
    const groupedMeals = useMemo(() => {
        const groups: Record<string, any[]> = {
            Breakfast: [],
            Lunch: [],
            Dinner: [],
            Snacks: []
        };

        filteredMeals.forEach((meal: any) => {
            const type = (meal.meal_type || "lunch").toLowerCase();
            if (type.includes("break")) groups.Breakfast.push(meal);
            else if (type.includes("din")) groups.Dinner.push(meal);
            else if (type.includes("snack")) groups.Snacks.push(meal);
            else groups.Lunch.push(meal);
        });

        return groups;
    }, [filteredMeals]);

    // Aggregate totals for the selected day
    const totals = useMemo(() => {
        return filteredMeals.reduce((acc, m: any) => ({
            calories: acc.calories + (Number(m.calories) || 0),
            protein: acc.protein + (Number(m.protein) || 0),
            carbs: acc.carbs + (Number(m.carbs) || 0),
            fat: acc.fat + (Number(m.fats) || 0),
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }, [filteredMeals]);

    const macroData = useMemo(() => [
        { name: 'Protein', value: totals.protein || 1, color: '#2563EB' },
        { name: 'Carbs', value: totals.carbs || 1, color: '#D97706' },
        { name: 'Fat', value: totals.fat || 1, color: '#E11D48' },
    ], [totals]);

    // Weekly calorie trends
    const weeklyTrends = useMemo(() => {
        return DATES.map(d => {
            const dayMeals = Array.isArray(meals) ? meals.filter((m: any) => {
                const logged = m.logged_at ? (m.logged_at.split("T")[0] || m.logged_at.split(" ")[0]) : "";
                return logged === d.id;
            }) : [];
            const cals = dayMeals.reduce((sum, m: any) => sum + (Number(m.calories) || 0), 0);
            return {
                day: d.dayName,
                cals: cals > 0 ? cals : (d.isToday ? totals.calories : 0)
            };
        });
    }, [meals, totals.calories]);

    // Handle Manual Add
    const handleSaveManual = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualName.trim()) {
            toast.error("Please enter food name");
            return;
        }

        setSubmittingManual(true);
        try {
            addMeal({
                name: manualName.trim(),
                calories: Number(manualCals) || 0,
                protein: Number(manualProtein) || 0,
                carbs: Number(manualCarbs) || 0,
                fats: Number(manualFats) || 0,
                meal_type: manualType
            });
            setIsManualModalOpen(false);
            setManualName("");
            setManualCals("");
            setManualProtein("");
            setManualCarbs("");
            setManualFats("");
        } catch {
            toast.error("Failed to add meal");
        } finally {
            setSubmittingManual(false);
        }
    };

    // Handle Image Upload & AI Scan
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAIModalOpen(true);
        setIsAnalyzing(true);
        setAiResult(null);

        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const base64 = reader.result as string;
                const response = await api.post("/api/analyze", { image: base64 });
                if (response.data) {
                    setAiResult({
                        name: response.data.foodName || "Healthy Meal",
                        cals: response.data.calories || 400,
                        protein: response.data.protein || 25,
                        carbs: response.data.carbs || 35,
                        fats: response.data.fats || 15
                    });
                }
            } catch (err: any) {
                toast.error(err.response?.data?.error || "AI Meal Analysis failed.");
                setIsAIModalOpen(false);
            } finally {
                setIsAnalyzing(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleConfirmAIMeal = (type: string) => {
        if (!aiResult) return;
        addMeal({
            name: aiResult.name,
            calories: aiResult.cals,
            protein: aiResult.protein,
            carbs: aiResult.carbs,
            fats: aiResult.fats,
            meal_type: type.toLowerCase()
        });
        setIsAIModalOpen(false);
        setAiResult(null);
    };

    return (
        <div className="min-h-screen w-full bg-[#F3F6F8] pb-32 text-[#0F172A] font-sans">
            
            {/* STICKY DATE SELECTOR */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 py-3.5">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
                        {DATES.map((date) => {
                            const isSelected = selectedDate === date.id;
                            return (
                                <button
                                    key={date.id}
                                    onClick={() => setSelectedDate(date.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center min-w-[3.5rem] px-3 py-2 rounded-xl transition-all duration-200 shrink-0",
                                        isSelected
                                            ? "bg-[#16A34A] text-white font-bold shadow-sm shadow-[#16A34A]/30"
                                            : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                                    )}
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{date.dayName}</span>
                                    <span className="text-base font-extrabold">{date.dateNum}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold transition-all shadow-sm"
                        >
                            <Camera className="w-4 h-4 text-purple-600" />
                            <span>AI Snap</span>
                        </button>
                        <button
                            onClick={() => setIsManualModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-sm transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Food</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN DESKTOP GRID */}
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: MEAL CATEGORIES (COL 1-7) */}
                    <div className="lg:col-span-7 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Nutrition Tracker</h1>
                                <p className="text-xs text-[#64748B] mt-0.5">Track your daily food logs and macro targets</p>
                            </div>
                            <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#BBF7D0]">
                                {totals.calories} kcal logged
                            </span>
                        </div>

                        {/* SECTIONS */}
                        {Object.entries(groupedMeals).map(([sectionName, sectionMeals]) => {
                            const sectionCals = sectionMeals.reduce((acc, m) => acc + (Number(m.calories) || 0), 0);
                            const isOpen = openSections[sectionName];

                            return (
                                <div key={sectionName} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm transition-all duration-200">
                                    <button
                                        onClick={() => toggleSection(sectionName)}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 focus:outline-none hover:bg-[#F8FAFC] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center font-bold text-sm">
                                                {sectionName.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-base text-[#0F172A]">{sectionName}</h3>
                                                <p className="text-[11px] text-[#64748B]">{sectionMeals.length} item{sectionMeals.length !== 1 ? 's' : ''}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-extrabold text-[#0F172A]">
                                                {sectionCals} <span className="text-xs text-[#64748B] font-normal">kcal</span>
                                            </span>
                                            {isOpen ? <ChevronUp className="w-5 h-5 text-[#94A3B8]" /> : <ChevronDown className="w-5 h-5 text-[#94A3B8]" />}
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 flex flex-col gap-2.5 border-t border-[#E2E8F0] pt-3 bg-white">
                                            {sectionMeals.length === 0 ? (
                                                <div className="py-4 text-center">
                                                    <p className="text-xs text-[#64748B] mb-2">No meals logged for {sectionName.toLowerCase()}</p>
                                                    <button
                                                        onClick={() => {
                                                            setManualType(sectionName.toLowerCase());
                                                            setIsManualModalOpen(true);
                                                        }}
                                                        className="text-xs font-bold text-[#16A34A] hover:text-[#15803D]"
                                                    >
                                                        + Log {sectionName}
                                                    </button>
                                                </div>
                                            ) : (
                                                sectionMeals.map((meal) => (
                                                    <div 
                                                        key={meal._id || meal.id || meal.name} 
                                                        className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-3"
                                                    >
                                                        <div>
                                                            <p className="font-bold text-sm text-[#0F172A]">{meal.name}</p>
                                                            <p className="text-xs text-[#16A34A] font-medium">{meal.calories || 0} kcal</p>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[11px] font-semibold shrink-0">
                                                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">{meal.protein || 0}p</span>
                                                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">{meal.carbs || 0}c</span>
                                                            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">{meal.fats || 0}f</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT COLUMN: CHARTS & BREAKDOWN (COL 8-12) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        {/* DAILY MACRO PIE CHART CARD */}
                        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col items-center">
                            <h2 className="text-base font-bold text-[#0F172A] w-full text-left mb-1">Macro Distribution</h2>
                            <p className="text-xs text-[#64748B] w-full text-left mb-4">Precision nutrition balance for {selectedDate}</p>

                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={macroData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={85}
                                            stroke="none"
                                            paddingAngle={4}
                                            dataKey="value"
                                            cornerRadius={8}
                                        >
                                            {macroData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-extrabold text-[#0F172A]">{totals.calories}</span>
                                    <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">kcal</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 w-full mt-6">
                                <div className="p-3 rounded-xl bg-[#EFF6FF] border border-blue-200 text-center">
                                    <span className="text-[10px] text-blue-700 font-bold uppercase block mb-1">Protein</span>
                                    <span className="text-base font-extrabold text-[#0F172A]">{totals.protein}g</span>
                                </div>
                                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-amber-200 text-center">
                                    <span className="text-[10px] text-amber-700 font-bold uppercase block mb-1">Carbs</span>
                                    <span className="text-base font-extrabold text-[#0F172A]">{totals.carbs}g</span>
                                </div>
                                <div className="p-3 rounded-xl bg-[#FFF1F2] border border-rose-200 text-center">
                                    <span className="text-[10px] text-rose-700 font-bold uppercase block mb-1">Fat</span>
                                    <span className="text-base font-extrabold text-[#0F172A]">{totals.fat}g</span>
                                </div>
                            </div>
                        </section>

                        {/* WEEKLY TREND CHART */}
                        <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                            <h2 className="text-base font-bold text-[#0F172A] mb-1">Weekly Calorie Trends</h2>
                            <p className="text-xs text-[#64748B] mb-4">Past 7-day intake history</p>

                            <div className="h-44 w-full -ml-3">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorCals" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            itemStyle={{ color: '#16A34A', fontWeight: 'bold' }}
                                            labelStyle={{ color: '#0F172A', fontWeight: 600 }}
                                        />
                                        <Area type="monotone" dataKey="cals" stroke="#16A34A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCals)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </section>

                    </div>

                </div>
            </main>

            {/* HIDDEN FILE INPUT */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
            />

            {/* MANUAL ENTRY MODAL */}
            {isManualModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-fade-in-up">
                        <button
                            onClick={() => setIsManualModalOpen(false)}
                            className="absolute top-5 right-5 text-[#64748B] hover:text-[#0F172A]"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-[#0F172A] mb-1">Log Food Entry</h3>
                        <p className="text-xs text-[#64748B] mb-5">Enter nutritional details for your meal</p>

                        <form onSubmit={handleSaveManual} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Meal Name</label>
                                <input
                                    type="text"
                                    required
                                    value={manualName}
                                    onChange={(e) => setManualName(e.target.value)}
                                    placeholder="Grilled Chicken Breast & Rice"
                                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">Calories (kcal)</label>
                                    <input
                                        type="number"
                                        required
                                        value={manualCals}
                                        onChange={(e) => setManualCals(e.target.value)}
                                        placeholder="450"
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">Meal Type</label>
                                    <select
                                        value={manualType}
                                        onChange={(e) => setManualType(e.target.value)}
                                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                                    >
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                        <option value="snacks">Snack</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-600 mb-1 uppercase">Protein (g)</label>
                                    <input
                                        type="number"
                                        value={manualProtein}
                                        onChange={(e) => setManualProtein(e.target.value)}
                                        placeholder="35"
                                        className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-amber-600 mb-1 uppercase">Carbs (g)</label>
                                    <input
                                        type="number"
                                        value={manualCarbs}
                                        onChange={(e) => setManualCarbs(e.target.value)}
                                        placeholder="40"
                                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-rose-600 mb-1 uppercase">Fat (g)</label>
                                    <input
                                        type="number"
                                        value={manualFats}
                                        onChange={(e) => setManualFats(e.target.value)}
                                        placeholder="12"
                                        className="w-full bg-rose-50/50 border border-rose-200 rounded-xl px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submittingManual}
                                className="w-full mt-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-sm disabled:opacity-50"
                            >
                                {submittingManual ? "Saving..." : "Save to Database"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* AI ANALYSIS MODAL */}
            {isAIModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 w-full max-w-sm flex flex-col items-center shadow-2xl relative animate-fade-in-up">
                        <button
                            onClick={() => setIsAIModalOpen(false)}
                            className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center mb-5">
                            {isAnalyzing ? (
                                <Loader2 className="w-8 h-8 text-[#16A34A] animate-spin" />
                            ) : (
                                <Check className="w-8 h-8 text-[#16A34A]" />
                            )}
                        </div>

                        {isAnalyzing ? (
                            <>
                                <h3 className="text-lg font-bold text-[#0F172A] text-center mb-1">Analyzing with OpenAI Vision...</h3>
                                <p className="text-xs text-[#64748B] text-center mb-4">Extracting ingredients, estimating portions, and calculating macros.</p>
                                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#16A34A] w-2/3 animate-pulse" />
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-extrabold text-[#0F172A] text-center mb-1">
                                    {aiResult?.name}
                                </h3>
                                <p className="text-sm text-[#16A34A] font-bold mb-5">{aiResult?.cals} kcal</p>

                                <div className="grid grid-cols-3 gap-2 w-full mb-6">
                                    <div className="p-2.5 rounded-xl bg-blue-50 text-center border border-blue-200">
                                        <span className="text-[10px] font-bold text-blue-700 uppercase block">Protein</span>
                                        <span className="text-sm font-extrabold text-[#0F172A]">{aiResult?.protein}g</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-amber-50 text-center border border-amber-200">
                                        <span className="text-[10px] font-bold text-amber-700 uppercase block">Carbs</span>
                                        <span className="text-sm font-extrabold text-[#0F172A]">{aiResult?.carbs}g</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-rose-50 text-center border border-rose-200">
                                        <span className="text-[10px] font-bold text-rose-700 uppercase block">Fat</span>
                                        <span className="text-sm font-extrabold text-[#0F172A]">{aiResult?.fats}g</span>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <button
                                        onClick={() => handleConfirmAIMeal("lunch")}
                                        className="w-full py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm transition-colors shadow-sm"
                                    >
                                        Log to Lunch
                                    </button>
                                    <button
                                        onClick={() => handleConfirmAIMeal("dinner")}
                                        className="w-full py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] text-xs font-semibold transition-colors"
                                    >
                                        Log to Dinner
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
