import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, Moon, Sun, Activity, Clock, Check, Edit3, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/utils";

// Helper for time math
const minsToTimeStr = (totalMins: number) => {
    const h = Math.floor(totalMins / 60) % 24;
    const m = totalMins % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, '0');
    return `${displayH}:${displayM} ${period}`;
};

export default function SleepTracker() {
    const navigate = useNavigate();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);

    // Entry State (in minutes since midnight)
    // 22:30 = 22*60+30 = 1350
    // 06:15 = 6*60+15 = 375
    const [bedMins, setBedMins] = useState(1350);
    const [wakeMins, setWakeMins] = useState(375);
    const [quality, setQuality] = useState('Good');

    // Derived Duration
    const getDurationMins = () => {
        let diff = wakeMins - bedMins;
        if (diff < 0) diff += 1440; // Crossed midnight
        return diff;
    };
    const duration = getDurationMins();
    const durH = Math.floor(duration / 60);
    const durM = duration % 60;

    const adjustTime = (setter: React.Dispatch<React.SetStateAction<number>>, current: number, delta: number) => {
        let newVal = current + delta;
        if (newVal < 0) newVal += 1440;
        if (newVal >= 1440) newVal -= 1440;
        setter(newVal);
    };

    const handleSave = () => {
        setIsModalOpen(false);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
    };

    return (
        <div className="min-h-screen w-full bg-[#F3F6F8] text-[#0F172A] font-sans pb-28 md:pb-12">

            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-all active:scale-95 text-[#0F172A]"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#64748B]" />
                        </button>
                        <div>
                            <h1 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                                Sleep Cycle & Recovery
                            </h1>
                            <p className="text-xs text-[#64748B] hidden sm:block">
                                Optimize deep sleep architecture and nocturnal recovery
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold transition-all shadow-sm"
                    >
                        <Edit3 className="w-4 h-4 text-purple-600" />
                        <span>Log Sleep</span>
                    </button>
                </div>
            </div>

            {/* Main Content Container */}
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                {/* Date Strip */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {[
                        { day: 'Mon', num: '20' },
                        { day: 'Tue', num: '21', dots: ['#16A34A'] },
                        { day: 'Wed', num: '22', dots: ['#16A34A'] },
                        { day: 'Thu', num: '23', active: true },
                        { day: 'Fri', num: '24' },
                        { day: 'Sat', num: '25' },
                        { day: 'Sun', num: '26' },
                    ].map((d, i) => (
                        <div key={i} className={cn(
                            "flex flex-col items-center justify-center min-w-[60px] py-2.5 rounded-2xl shrink-0 border transition-all cursor-pointer",
                            d.active
                                ? "bg-purple-50 border-purple-300 shadow-sm"
                                : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
                        )}>
                            <span className={cn("text-[10px] uppercase font-bold mb-0.5", d.active ? "text-purple-700" : "text-[#64748B]")}>{d.day}</span>
                            <span className={cn("text-base font-extrabold", d.active ? "text-[#0F172A]" : "text-[#0F172A]")}>{d.num}</span>
                            <div className="h-1 mt-1 flex gap-0.5">
                                {d.dots && d.dots.map((c, j) => <div key={j} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grid Layout: Sleep Score & Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN: SLEEP SCORE & STAGES (COL 1-7) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* Main Sleep Score Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-2xl pointer-events-none" />

                            {/* Top Row */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-xs text-purple-700 font-bold uppercase tracking-wider block mb-1">Nightly Sleep Score</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-extrabold text-[#0F172A]">82</span>
                                        <span className="text-lg font-bold text-[#94A3B8]">/100</span>
                                    </div>
                                </div>
                                <div className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 flex items-center gap-1.5 shadow-sm">
                                    <Moon className="w-4 h-4 text-purple-600 fill-purple-600" />
                                    <span className="text-xs font-bold text-purple-700">Good Quality</span>
                                </div>
                            </div>

                            {/* Wave Chart */}
                            <div className="relative h-28 w-full mb-6">
                                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserveAspectRatio-none">
                                    <defs>
                                        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#2563EB" />
                                            <stop offset="50%" stopColor="#7C3AED" />
                                            <stop offset="100%" stopColor="#16A34A" />
                                        </linearGradient>
                                        <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(124,58,237,0.15)" />
                                            <stop offset="100%" stopColor="rgba(124,58,237,0)" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,20 Q10,10 20,25 T40,15 T60,35 T80,10 T100,20 L100,40 L0,40 Z"
                                        fill="url(#fillGrad)"
                                    />
                                    <path
                                        d="M0,20 Q10,10 20,25 T40,15 T60,35 T80,10 T100,20"
                                        fill="none"
                                        stroke="url(#waveGrad)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle cx="60" cy="35" r="2.5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
                                </svg>
                                <div className="absolute -bottom-2 left-0 right-0 flex justify-between text-[10px] text-[#64748B] font-bold px-1">
                                    <span>10:30 PM (Sleep)</span>
                                    <span>2:15 AM (Peak Deep)</span>
                                    <span>6:15 AM (Wake)</span>
                                </div>
                            </div>

                            {/* Stage Metrics */}
                            <div className="grid grid-cols-3 gap-3 border-t border-[#E2E8F0] pt-5">
                                <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] text-center">
                                    <div className="flex items-center justify-center gap-1.5 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                        <span className="text-[10px] text-[#64748B] font-bold uppercase">Deep Sleep</span>
                                    </div>
                                    <div className="text-base font-extrabold text-[#0F172A]">1h 52m</div>
                                </div>
                                <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] text-center">
                                    <div className="flex items-center justify-center gap-1.5 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-[10px] text-[#64748B] font-bold uppercase">Light Sleep</span>
                                    </div>
                                    <div className="text-base font-extrabold text-[#0F172A]">2h 34m</div>
                                </div>
                                <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] text-center">
                                    <div className="flex items-center justify-center gap-1.5 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                                        <span className="text-[10px] text-[#64748B] font-bold uppercase">REM Sleep</span>
                                    </div>
                                    <div className="text-base font-extrabold text-[#0F172A]">1h 44m</div>
                                </div>
                            </div>
                        </div>

                        {/* Last Night's Timeline */}
                        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
                            <h3 className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-4">Sleep Architecture Timeline</h3>

                            {/* Segmented Bar */}
                            <div className="w-full h-8 rounded-full overflow-hidden flex mb-3 border border-[#E2E8F0] shadow-inner">
                                <div className="h-full bg-amber-400" style={{ width: '4%' }} title="Awake" />
                                <div className="h-full bg-blue-400" style={{ width: '30%' }} title="Light" />
                                <div className="h-full bg-purple-500" style={{ width: '28%' }} title="Deep" />
                                <div className="h-full bg-emerald-500" style={{ width: '25%' }} title="REM" />
                                <div className="h-full bg-blue-400" style={{ width: '13%' }} title="Light" />
                            </div>

                            {/* Timeline labels */}
                            <div className="flex justify-between text-[11px] text-[#64748B] font-semibold px-1 mb-4">
                                <span>10:30 PM</span>
                                <span>12:00 AM</span>
                                <span>3:00 AM</span>
                                <span>6:15 AM</span>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#64748B] justify-center pt-2 border-t border-[#E2E8F0]">
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-amber-400 rounded-sm" /> Awake 4%</div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-400 rounded-sm" /> Light 43%</div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" /> Deep 28%</div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> REM 25%</div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: STATS & RECOMMENDATIONS (COL 8-12) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        {/* Stats Grid 2x2 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <Clock className="w-5 h-5 text-purple-600" />
                                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">↑12m</span>
                                </div>
                                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mb-1">Total Sleep</span>
                                <span className="text-xl font-extrabold text-[#0F172A]">7h 40m</span>
                            </div>

                            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <Moon className="w-5 h-5 text-blue-600" />
                                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">On Time</span>
                                </div>
                                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mb-1">Bedtime</span>
                                <span className="text-xl font-extrabold text-[#0F172A]">10:32 PM</span>
                            </div>

                            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <Sun className="w-5 h-5 text-amber-500" />
                                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">Restful</span>
                                </div>
                                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mb-1">Wake Time</span>
                                <span className="text-xl font-extrabold text-[#0F172A]">06:15 AM</span>
                            </div>

                            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <Activity className="w-5 h-5 text-rose-500" />
                                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">↓2</span>
                                </div>
                                <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mb-1">Interruptions</span>
                                <span className="text-xl font-extrabold text-[#0F172A]">3×</span>
                            </div>
                        </div>

                        {/* Weekly Goal Card */}
                        <div className="bg-white rounded-3xl p-5 border border-[#BBF7D0] bg-gradient-to-r from-white to-[#F0FDF4] shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center shrink-0">
                                <Activity className="w-6 h-6 text-[#16A34A]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#0F172A] mb-0.5">Weekly Sleep Goal</h4>
                                <p className="text-xs text-[#64748B]">5 of 7 nights ≥ 7 hours</p>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-extrabold text-[#16A34A]">78%</span>
                                <div className="w-14 h-1.5 bg-[#E2E8F0] rounded-full mt-1 overflow-hidden">
                                    <div className="h-full bg-[#16A34A]" style={{ width: '78%' }} />
                                </div>
                            </div>
                        </div>

                        {/* AI Recommendations */}
                        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm">
                            <h3 className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-4">Tonight's AI Sleep Protocol</h3>
                            <ul className="space-y-3.5">
                                <li className="flex gap-3 text-xs text-[#0F172A] font-medium items-start">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-1 shrink-0" />
                                    <span>Dim artificial blue screens by 9:30 PM to trigger endogenous melatonin surge.</span>
                                </li>
                                <li className="flex gap-3 text-xs text-[#0F172A] font-medium items-start">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-1 shrink-0" />
                                    <span>Optimal target bedtime: 10:15 PM to hit your 8-hour target.</span>
                                </li>
                                <li className="flex gap-3 text-xs text-[#0F172A] font-medium items-start">
                                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-1 shrink-0" />
                                    <span>Keep bedroom ambient temperature at 18°C (65°F) for deep stage 4 recovery.</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

            </main>

            {/* Modal for Manual Entry */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-[#64748B] hover:text-[#0F172A]"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold text-[#0F172A] mb-1">Log Sleep Entry</h2>
                        <p className="text-xs text-[#64748B] mb-6">Manually record sleep timings and perceived restfulness</p>

                        {/* Time Pickers */}
                        <div className="flex items-center gap-3 mb-6">
                            {/* Bedtime */}
                            <div className="flex-1 bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] text-center">
                                <div className="flex justify-center mb-1"><Moon className="w-4 h-4 text-purple-600" /></div>
                                <div className="text-lg font-extrabold text-[#0F172A] mb-3">
                                    {minsToTimeStr(bedMins)}
                                </div>
                                <div className="flex justify-between gap-1">
                                    <button onClick={() => adjustTime(setBedMins, bedMins, -30)} className="flex-1 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9]">−30m</button>
                                    <button onClick={() => adjustTime(setBedMins, bedMins, 30)} className="flex-1 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9]">+30m</button>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-[#94A3B8] shrink-0" />

                            {/* Wake Time */}
                            <div className="flex-1 bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] text-center">
                                <div className="flex justify-center mb-1"><Sun className="w-4 h-4 text-[#16A34A]" /></div>
                                <div className="text-lg font-extrabold text-[#0F172A] mb-3">
                                    {minsToTimeStr(wakeMins)}
                                </div>
                                <div className="flex justify-between gap-1">
                                    <button onClick={() => adjustTime(setWakeMins, wakeMins, -30)} className="flex-1 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9]">−30m</button>
                                    <button onClick={() => adjustTime(setWakeMins, wakeMins, 30)} className="flex-1 py-1 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9]">+30m</button>
                                </div>
                            </div>
                        </div>

                        {/* Calculated Duration */}
                        <div className="flex justify-center mb-6">
                            <div className="px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-bold text-[#16A34A] flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                {durH}h {durM}m total recorded sleep
                            </div>
                        </div>

                        {/* Quality Selectors */}
                        <div className="mb-6">
                            <h3 className="text-xs text-[#64748B] font-bold uppercase mb-2.5">Sleep Quality</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {['Poor', 'Fair', 'Good', 'Great'].map(q => {
                                    const isSel = quality === q;
                                    const emoji = q === 'Poor' ? '😴' : q === 'Fair' ? '😐' : q === 'Good' ? '😊' : '😁';
                                    return (
                                        <button
                                            key={q}
                                            onClick={() => setQuality(q)}
                                            className={cn(
                                                "py-2.5 rounded-xl flex flex-col items-center gap-1 border transition-all",
                                                isSel ? "bg-[#F0FDF4] border-[#16A34A] text-[#16A34A] font-bold shadow-sm" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                                            )}
                                        >
                                            <span className="text-base">{emoji}</span>
                                            <span className="text-[10px] font-bold">{q}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm bg-[#16A34A] hover:bg-[#15803D] shadow-sm active:scale-[0.98] transition-all"
                        >
                            <Check className="w-4 h-4" />
                            Save Sleep Entry
                        </button>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {toastVisible && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] animate-fade-in">
                    <div className="bg-[#16A34A] text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        Sleep entry logged successfully!
                    </div>
                </div>
            )}

        </div>
    );
}
