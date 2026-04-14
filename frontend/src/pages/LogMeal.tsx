import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Plus, Camera, PenSquare, X, Loader2, Check } from "lucide-react";
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/utils/utils";

// Mock Data
const MACRO_DATA = [
    { name: 'Protein', value: 95, color: '#3b82f6' },
    { name: 'Carbs', value: 140, color: '#f59e0b' },
    { name: 'Fat', value: 45, color: '#f43f5e' },
];

const WEEKLY_TRENDS = [
    { day: 'Mon', cals: 1800 },
    { day: 'Tue', cals: 2100 },
    { day: 'Wed', cals: 1950 },
    { day: 'Thu', cals: 2200 },
    { day: 'Fri', cals: 1750 },
    { day: 'Sat', cals: 2400 },
    { day: 'Sun', cals: 1250 },
];

const MEALS = {
    Breakfast: [
        { id: 1, name: "Oatmeal & Berries", weight: "250g", cals: 320, macros: { p: 12, c: 45, f: 8 } }
    ],
    Lunch: [
        { id: 2, name: "Grilled Chicken Salad", weight: "350g", cals: 450, macros: { p: 40, c: 15, f: 12 } }
    ],
    Dinner: [],
    Snacks: [
        { id: 3, name: "Protein Shake", weight: "300ml", cals: 180, macros: { p: 25, c: 5, f: 2 } }
    ]
};

const DATES = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i);
    return {
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate(),
        isToday: i === 3,
        id: d.toISOString()
    };
});

export default function LogMeal() {
    const [selectedDate, setSelectedDate] = useState(DATES[3].id);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({ Breakfast: true, Lunch: true });

    // FAB & Modal State
    const [isFabOpen, setIsFabOpen] = useState(false);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    interface AnalysisResult {
        name: string;
        cals: number;
        macros: {
            p: number;
            c: number;
            f: number;
        };
    }

    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsFabOpen(false);
            setIsAIModalOpen(true);
            setIsAnalyzing(true);
            setAnalysisResult(null);

            // Mock Gemini Analysis Delay
            setTimeout(() => {
                setIsAnalyzing(false);
                setAnalysisResult({
                    name: "Avocado Toast with Egg",
                    cals: 380,
                    macros: { p: 14, c: 35, f: 22 }
                });
            }, 2500);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0A0A] pb-32 text-white font-sans selection:bg-[#22C55E]/30 relative">

            {/* Sticky Date Selector */}
            <div className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
                <div className="max-w-lg mx-auto flex justify-between items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
                    {DATES.map((date) => (
                        <button
                            key={date.id}
                            onClick={() => setSelectedDate(date.id)}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[3rem] p-2 rounded-xl transition-all duration-300",
                                selectedDate === date.id
                                    ? "bg-[#22C55E] text-[#0A0A0A] shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                    : "text-zinc-400 hover:bg-zinc-800"
                            )}
                        >
                            <span className="text-[10px] font-bold uppercase tracking-wider">{date.dayName}</span>
                            <span className="text-lg font-heading font-extrabold">{date.dateNum}</span>
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-lg mx-auto w-full px-6 flex flex-col gap-6 pt-6">

                {/* Daily Summary Card */}
                <section className="glass-card p-6 flex flex-col items-center relative animate-fade-in-up">
                    <h2 className="text-lg font-heading font-bold w-full text-left mb-2">Daily Summary</h2>

                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={MACRO_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    stroke="none"
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={10}
                                >
                                    {MACRO_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-heading font-extrabold">1250</span>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">kcal</span>
                        </div>
                    </div>

                    <div className="flex w-full justify-between items-center mt-4 px-4">
                        {MACRO_DATA.map((macro) => (
                            <div key={macro.name} className="flex flex-col items-center">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: macro.color }} />
                                    <span className="text-xs font-medium text-zinc-400">{macro.name}</span>
                                </div>
                                <span className="font-bold text-sm text-white">{macro.value}g</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Meal Sections */}
                <section className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    {Object.entries(MEALS).map(([sectionName, meals]) => (
                        <div key={sectionName} className="glass-card overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggleSection(sectionName)}
                                className="w-full flex items-center justify-between p-4 focus:outline-none"
                            >
                                <div className="flex items-center gap-3">
                                    <h3 className="font-heading font-bold text-lg">{sectionName}</h3>
                                    <span className="text-xs font-semibold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">
                                        {meals.length}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <span className="text-xs font-bold text-white">
                                        {meals.reduce((acc, m) => acc + m.cals, 0)} kcal
                                    </span>
                                    {openSections[sectionName] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {openSections[sectionName] && (
                                <div className="px-4 pb-4 flex flex-col gap-3">
                                    {meals.length === 0 ? (
                                        <p className="text-xs font-medium text-zinc-600 text-center py-2">No meals logged yet.</p>
                                    ) : (
                                        meals.map(meal => (
                                            <div key={meal.id} className="bg-[#1C1C1C] rounded-xl p-3 flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm text-white">{meal.name}</span>
                                                    <span className="text-xs text-zinc-500 font-medium">{meal.weight}</span>
                                                </div>
                                                <div className="flex gap-1.5 items-center">
                                                    <span className="macro-pill-protein px-2 py-0.5 rounded-md text-[10px] font-bold">{meal.macros.p}p</span>
                                                    <span className="macro-pill-carbs px-2 py-0.5 rounded-md text-[10px] font-bold">{meal.macros.c}c</span>
                                                    <span className="macro-pill-fats px-2 py-0.5 rounded-md text-[10px] font-bold">{meal.macros.f}f</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* Weekly Trends */}
                <section className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                    <h2 className="text-lg font-heading font-bold mb-4">Weekly Calorie Trend</h2>
                    <div className="h-48 w-full -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={WEEKLY_TRENDS} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCals" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} dy={10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#161616', border: '1px solid #27272a', borderRadius: '12px' }}
                                    itemStyle={{ color: '#22C55E', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#a1a1aa' }}
                                />
                                <Area type="monotone" dataKey="cals" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorCals)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-24 right-6 z-40 md:bottom-12 md:right-12">
                <div className="relative">
                    {/* Bottom Sheet Backdrop & Options */}
                    {isFabOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
                                onClick={() => setIsFabOpen(false)}
                            />
                            <div className="absolute bottom-16 right-0 z-50 flex flex-col gap-3 animate-fade-in-up">
                                <button className="flex items-center gap-3 bg-[#1C1C1C] text-white px-5 py-3 rounded-full shadow-xl border border-zinc-800 hover:bg-zinc-800 transition-colors whitespace-nowrap group">
                                    <span className="text-sm font-bold">Manual Entry</span>
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700">
                                        <PenSquare size={16} className="text-zinc-400" />
                                    </div>
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-3 bg-[#1C1C1C] text-white px-5 py-3 rounded-full shadow-xl border border-zinc-800 hover:bg-zinc-800 transition-colors whitespace-nowrap group"
                                >
                                    <span className="text-sm font-bold text-[#22C55E]">AI Snap</span>
                                    <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center group-hover:bg-[#22C55E]/30 shadow-glow-purple">
                                        <Camera size={16} className="text-[#22C55E]" />
                                    </div>
                                </button>
                            </div>
                        </>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />

                    <button
                        onClick={() => setIsFabOpen(!isFabOpen)}
                        className={cn(
                            "w-14 h-14 rounded-full flex items-center justify-center text-[#0A0A0A] shadow-premium transition-all duration-300 z-50 relative",
                            isFabOpen ? "bg-zinc-800 text-white rotate-45 shadow-none" : "bg-[#22C55E] hover:scale-105 active:scale-95"
                        )}
                    >
                        <Plus size={28} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* AI Analysis Modal */}
            {isAIModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center px-6">
                    <div className="bg-[#161616] border border-zinc-800 rounded-[2rem] p-8 w-full max-w-sm flex flex-col items-center shadow-2xl relative animate-fade-in-up">
                        <button
                            onClick={() => setIsAIModalOpen(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-6 shadow-glow-purple">
                            {isAnalyzing ? (
                                <Loader2 size={36} className="text-[#22C55E] animate-spin" />
                            ) : (
                                <Check size={36} className="text-[#22C55E]" />
                            )}
                        </div>

                        {isAnalyzing ? (
                            <>
                                <h3 className="text-xl font-heading font-bold mb-2 text-center text-white">Analyzing with Gemini...</h3>
                                <p className="text-sm text-zinc-400 text-center mb-6">Identifying food items and calculating precision macros.</p>

                                <div className="w-full space-y-3">
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#22C55E] w-1/2 animate-shimmer" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-heading font-bold mb-1 text-center text-white">
                                    {analysisResult?.name}
                                </h3>
                                <p className="text-sm text-[#22C55E] font-bold mb-6">{analysisResult?.cals} kcal</p>

                                <div className="flex gap-4 w-full justify-center mb-8">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Protein</span>
                                        <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 flex items-center justify-center bg-blue-500/10 text-white font-bold">{analysisResult?.macros.p}g</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">Carbs</span>
                                        <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 flex items-center justify-center bg-amber-500/10 text-white font-bold">{analysisResult?.macros.c}g</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-1">Fat</span>
                                        <div className="w-12 h-12 rounded-full border-2 border-rose-500/30 flex items-center justify-center bg-rose-500/10 text-white font-bold">{analysisResult?.macros.f}g</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsAIModalOpen(false)}
                                    className="w-full py-4 rounded-full bg-[#22C55E] text-[#0A0A0A] font-bold text-lg hover:bg-green-400 transition-colors shadow-premium flex items-center justify-center gap-2"
                                >
                                    Log to Breakfast
                                    <Check size={20} strokeWidth={3} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
