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
        <div className="min-h-full w-full bg-[#0b0f1a] text-[#f5f0e8] relative font-sans selection:bg-[#a78bfa]/30 scrollbar-hide pb-20 md:pb-6">

            {/* Inject Font and Keyframes */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sora:wght@100..800&display=swap');
                    @keyframes slide-up {
                        from { transform: translateY(100%); }
                        to { transform: translateY(0); }
                    }
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}
            </style>

            {/* Ambient Purple Glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 100%)'
                }}
            />

            {/* Top Navigation */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4 sticky top-0 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-[#141927] flex items-center justify-center border border-white/5 shadow-md active:scale-95 transition-transform"
                >
                    <ChevronLeft className="w-5 h-5 text-[#f5f0e8]" />
                </button>
                <h1 className="text-[1.4rem] font-bold text-[#f5f0e8] tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Sleep Cycle
                </h1>
                <button className="w-10 h-10 rounded-full flex items-center justify-center active:bg-white/5 transition-colors">
                    <Settings className="w-5 h-5 text-[#a78bfa]" />
                </button>
            </div>

            <div className="px-6 space-y-5 relative z-10 pt-2">

                {/* Date Strip */}
                <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2">
                    {[
                        { day: 'Mon', num: '20' },
                        { day: 'Tue', num: '21', dots: ['#34d399'] },
                        { day: 'Wed', num: '22', dots: ['#34d399'] },
                        { day: 'Thu', num: '23', active: true },
                        { day: 'Fri', num: '24' },
                        { day: 'Sat', num: '25' },
                        { day: 'Sun', num: '26' },
                    ].map((d, i) => (
                        <div key={i} className={cn(
                            "flex flex-col items-center justify-center min-w-[54px] py-3 rounded-[16px] shrink-0 border transition-all",
                            d.active ? "bg-[#a78bfa]/10 border-[#a78bfa]/30 shadow-[0_0_15px_rgba(167,139,250,0.15)]" : "bg-[#141927] border-white/5"
                        )}>
                            <span className={cn("text-[10px] uppercase font-bold mb-1", d.active ? "text-[#a78bfa]" : "text-zinc-500")}>{d.day}</span>
                            <span className={cn("text-lg font-bold", d.active ? "text-[#f5f0e8]" : "text-zinc-300")} style={{ fontFamily: '"Playfair Display", serif' }}>{d.num}</span>
                            <div className="h-1 mt-1 flex gap-0.5">
                                {d.dots && d.dots.map((c, j) => <div key={j} className="w-1 h-1 rounded-full" style={{ backgroundColor: c }} />)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Sleep Score Card */}
                <div
                    className="rounded-[24px] overflow-hidden relative border p-5 shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a1535 0%, #141927 100%)',
                        borderColor: 'rgba(167,139,250,0.15)'
                    }}
                >
                    {/* Inner Glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a78bfa]/10 blur-[40px] rounded-full pointer-events-none" />

                    {/* Top Row */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-[10px] text-[#a78bfa] font-bold uppercase tracking-[0.2em] block mb-1">Sleep Score</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[3rem] leading-none font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>82</span>
                                <span className="text-xl font-bold text-zinc-500" style={{ fontFamily: '"Playfair Display", serif' }}>/100</span>
                            </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center gap-1.5 shadow-[0_0_10px_rgba(167,139,250,0.2)]">
                            <Moon className="w-3.5 h-3.5 text-[#a78bfa] fill-[#a78bfa]" />
                            <span className="text-[11px] font-bold text-[#a78bfa]">Good Sleep</span>
                        </div>
                    </div>

                    {/* SVG Chart */}
                    <div className="relative h-[80px] w-full mb-6">
                        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserveAspectRatio-none">
                            <defs>
                                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#60a5fa" />
                                    <stop offset="50%" stopColor="#a78bfa" />
                                    <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                                <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(124,58,237,0.25)" />
                                    <stop offset="100%" stopColor="rgba(124,58,237,0)" />
                                </linearGradient>
                            </defs>
                            {/* Path Fill */}
                            <path
                                d="M0,20 Q10,10 20,25 T40,15 T60,35 T80,10 T100,20 L100,40 L0,40 Z"
                                fill="url(#fillGrad)"
                            />
                            {/* Path Line */}
                            <path
                                d="M0,20 Q10,10 20,25 T40,15 T60,35 T80,10 T100,20"
                                fill="none"
                                stroke="url(#waveGrad)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {/* Apex Dot */}
                            <circle cx="60" cy="35" r="2.5" fill="#a78bfa" stroke="#0b0f1a" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px rgba(167,139,250,0.8))' }} />
                        </svg>
                        {/* Time labels for chart */}
                        <div className="absolute -bottom-2 left-0 right-0 flex justify-between text-[9px] text-zinc-500 font-bold px-1">
                            <span>10 PM</span>
                            <span>2 AM</span>
                            <span>6 AM</span>
                        </div>
                    </div>

                    {/* Stage Metrics */}
                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                        <div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" style={{ boxShadow: '0 0 6px #a78bfa' }} />
                                <span className="text-[10px] text-zinc-400 font-bold uppercase">Deep</span>
                            </div>
                            <div className="text-sm font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>1h 52m</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]" style={{ boxShadow: '0 0 6px #60a5fa' }} />
                                <span className="text-[10px] text-zinc-400 font-bold uppercase">Light</span>
                            </div>
                            <div className="text-sm font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>2h 34m</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" style={{ boxShadow: '0 0 6px #34d399' }} />
                                <span className="text-[10px] text-zinc-400 font-bold uppercase">REM</span>
                            </div>
                            <div className="text-sm font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>1h 44m</div>
                        </div>
                    </div>
                </div>

                {/* Last Night's Timeline */}
                <div className="bg-[#141927] rounded-[20px] p-5 border border-[rgba(255,255,255,0.05)] shadow-lg">
                    <h3 className="text-[11px] text-zinc-400 font-bold uppercase tracking-[0.15em] mb-4">Timeline</h3>

                    {/* Segmented Bar */}
                    <div className="w-full h-[36px] rounded-full overflow-hidden flex mb-3 border border-white/5">
                        <div className="h-full bg-[#fbbf24]/80" style={{ width: '4%' }} />
                        <div className="h-full bg-[#60a5fa]" style={{ width: '30%' }} />
                        <div className="h-full bg-[#a78bfa]" style={{ width: '28%' }} />
                        <div className="h-full bg-[#34d399]" style={{ width: '25%' }} />
                        <div className="h-full bg-[#60a5fa]" style={{ width: '13%' }} />
                    </div>

                    {/* Timeline text labels */}
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold px-1 mb-4">
                        <span>10:30 PM</span>
                        <span>12:00 AM</span>
                        <span>3:00 AM</span>
                        <span>6:15 AM</span>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold text-zinc-400 justify-center">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#fbbf24] rounded-sm" /> Awake 4%</div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#60a5fa] rounded-sm" /> Light 43%</div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#a78bfa] rounded-sm" /> Deep 28%</div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#34d399] rounded-sm" /> REM 25%</div>
                    </div>
                </div>

                {/* Stats Grid 2x2 */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Stat 1 */}
                    <div className="bg-[#141927] rounded-[20px] p-4 border border-[rgba(255,255,255,0.05)] shadow-md">
                        <div className="flex justify-between items-start mb-2">
                            <Clock className="w-5 h-5 text-[#a78bfa]" />
                            <span className="text-[10px] font-bold text-[#34d399] bg-[#34d399]/10 px-1.5 py-0.5 rounded">↑12m</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1">Total Sleep</span>
                        <span className="text-xl font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>7h 40m</span>
                    </div>
                    {/* Stat 2 */}
                    <div className="bg-[#141927] rounded-[20px] p-4 border border-[rgba(255,255,255,0.05)] shadow-md">
                        <div className="flex justify-between items-start mb-2">
                            <Moon className="w-5 h-5 text-[#60a5fa]" />
                            <span className="text-[10px] font-bold text-[#34d399] bg-[#34d399]/10 px-1.5 py-0.5 rounded">↑3%</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1">Bedtime</span>
                        <span className="text-xl font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>10:32</span>
                    </div>
                    {/* Stat 3 */}
                    <div className="bg-[#141927] rounded-[20px] p-4 border border-[rgba(255,255,255,0.05)] shadow-md">
                        <div className="flex justify-between items-start mb-2">
                            <Sun className="w-5 h-5 text-[#34d399]" />
                            <span className="text-[10px] font-bold text-[#34d399] bg-[#34d399]/10 px-1.5 py-0.5 rounded">↑8m</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1">Wake Time</span>
                        <span className="text-xl font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>06:15</span>
                    </div>
                    {/* Stat 4 */}
                    <div className="bg-[#141927] rounded-[20px] p-4 border border-[rgba(255,255,255,0.05)] shadow-md">
                        <div className="flex justify-between items-start mb-2">
                            <Activity className="w-5 h-5 text-[#fbbf24]" />
                            <span className="text-[10px] font-bold text-[#f87171] bg-[#ef4444]/10 px-1.5 py-0.5 rounded">↓2</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block mb-1">Interruptions</span>
                        <span className="text-xl font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>3×</span>
                    </div>
                </div>

                {/* Weekly Goal Card */}
                <div className="bg-[#141927] rounded-[20px] p-4 border border-[rgba(52,211,153,0.15)] shadow-[0_0_15px_rgba(52,211,153,0.05)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#34d399]/10 flex items-center justify-center shrink-0 border border-[#34d399]/20">
                        <Activity className="w-6 h-6 text-[#34d399]" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-[#f5f0e8] mb-0.5">Weekly Sleep Goal</h4>
                        <p className="text-[10px] text-zinc-400 font-medium font-sans">5 of 7 nights ≥ 7 hours</p>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-bold text-[#34d399]" style={{ fontFamily: '"Playfair Display", serif' }}>78%</span>
                        <div className="w-[50px] h-1.5 bg-[#0b0f1a] rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-[#34d399]" style={{ width: '78%' }} />
                        </div>
                    </div>
                </div>

                {/* Manual Entry Button Card */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-[20px] p-4 shadow-lg flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
                    style={{
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(99,102,241,0.06))',
                        border: '1px solid rgba(167,139,250,0.2)'
                    }}
                >
                    <div className="w-12 h-12 rounded-full bg-[#a78bfa]/10 flex items-center justify-center shrink-0 border border-[#a78bfa]/20">
                        <Edit3 className="w-6 h-6 text-[#a78bfa]" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-[#f5f0e8] mb-0.5">Add Sleep Entry</h4>
                        <p className="text-[10px] text-zinc-400 font-medium font-sans mt-0.5">Manually log bedtime, wake time & quality</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#a78bfa]" />
                </div>

                {/* AI Recommendations */}
                <div className="bg-[#141927] rounded-[20px] p-5 border border-[rgba(255,255,255,0.05)] shadow-md">
                    <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.15em] mb-4">Tonight's Recommendations</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-xs text-zinc-300 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-1 shrink-0 shadow-[0_0_6px_#a78bfa]" />
                            <span>Stop viewing screens by 9:30 PM to improve melatonin production.</span>
                        </li>
                        <li className="flex gap-3 text-xs text-zinc-300 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-1 shrink-0 shadow-[0_0_6px_#a78bfa]" />
                            <span>Target bedtime: 10:15 PM to reach your weekly goal.</span>
                        </li>
                        <li className="flex gap-3 text-xs text-zinc-300 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-1 shrink-0 shadow-[0_0_6px_#a78bfa]" />
                            <span>Keep room temperature around 18°C (65°F) for optimal deep sleep.</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Sheet Modal for Manual Entry */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ animation: 'fade-in 0.2s ease-out' }}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

                    {/* Sheet */}
                    <div
                        className="relative w-full max-w-[390px] mx-auto bg-[#0f1625] rounded-[28px_28px_0_0] border-t border-l border-r border-[#a78bfa]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col pt-3 pb-8 px-6"
                        style={{ animation: 'slide-up 0.4s cubic-bezier(0.32,0.72,0,1) forwards' }}
                    >
                        {/* Drag Handle */}
                        <div className="w-12 h-1.5 rounded-full bg-white/10 mx-auto mb-6" />

                        <h2 className="text-xl font-bold text-[#f5f0e8] mb-6 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>Log Sleep</h2>

                        {/* Date Pills */}
                        <div className="flex gap-3 mb-8">
                            <div className="flex-1 py-2 text-center rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] text-xs font-bold">Today, Feb 28</div>
                            <div className="flex-1 py-2 text-center rounded-full bg-[#141927] border border-white/5 text-zinc-400 text-xs font-bold">Yesterday</div>
                            <div className="w-12 flex shrink-0 items-center justify-center rounded-full bg-[#141927] border border-white/5 text-zinc-400">
                                <span className="text-[10px] font-bold">...</span>
                            </div>
                        </div>

                        {/* Time Pickers */}
                        <div className="flex items-center gap-2 mb-6">
                            {/* Bedtime */}
                            <div className="flex-1 bg-[#141927] rounded-[20px] p-4 border border-[rgba(255,255,255,0.05)] text-center shadow-lg">
                                <div className="flex justify-center mb-1"><Moon className="w-4 h-4 text-[#a78bfa] fill-[#a78bfa]/20" /></div>
                                <div className="text-[1.3rem] font-bold text-[#f5f0e8] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {minsToTimeStr(bedMins)}
                                </div>
                                <div className="flex justify-between gap-1">
                                    <button onClick={() => adjustTime(setBedMins, bedMins, -30)} className="flex-1 py-1.5 bg-black/30 rounded-lg text-sm font-bold text-[#a78bfa] active:bg-black/50">−30</button>
                                    <button onClick={() => adjustTime(setBedMins, bedMins, 30)} className="flex-1 py-1.5 bg-black/30 rounded-lg text-sm font-bold text-[#a78bfa] active:bg-black/50">+30</button>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-zinc-600 shrink-0" />

                            {/* Wake Time */}
                            <div className="flex-1 bg-[#141927] rounded-[20px] p-4 border border-[rgba(255,255,255,0.05)] text-center shadow-lg">
                                <div className="flex justify-center mb-1"><Sun className="w-4 h-4 text-[#34d399] fill-[#34d399]/20" /></div>
                                <div className="text-[1.3rem] font-bold text-[#f5f0e8] mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {minsToTimeStr(wakeMins)}
                                </div>
                                <div className="flex justify-between gap-1">
                                    <button onClick={() => adjustTime(setWakeMins, wakeMins, -30)} className="flex-1 py-1.5 bg-black/30 rounded-lg text-sm font-bold text-[#34d399] active:bg-black/50">−30</button>
                                    <button onClick={() => adjustTime(setWakeMins, wakeMins, 30)} className="flex-1 py-1.5 bg-black/30 rounded-lg text-sm font-bold text-[#34d399] active:bg-black/50">+30</button>
                                </div>
                            </div>
                        </div>

                        {/* Calculated Duration Pill */}
                        <div className="flex justify-center mb-8">
                            <div className="px-4 py-1.5 rounded-full bg-[#34d399]/10 border border-[#34d399]/20 text-[11px] font-bold text-[#34d399] flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                {durH}h {durM}m total sleep
                            </div>
                        </div>

                        {/* Quality Selectors */}
                        <div className="mb-6">
                            <h3 className="text-[11px] text-zinc-500 font-bold uppercase mb-3 pl-1">Sleep Quality</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {['Poor', 'Fair', 'Good', 'Great'].map(q => {
                                    const isSel = quality === q;
                                    const emoji = q === 'Poor' ? '😴' : q === 'Fair' ? '😐' : q === 'Good' ? '😊' : '😁';
                                    return (
                                        <button
                                            key={q}
                                            onClick={() => setQuality(q)}
                                            className={cn(
                                                "py-3 rounded-[16px] flex flex-col items-center gap-1.5 border transition-all",
                                                isSel ? "bg-[#a78bfa]/10 border-[#a78bfa]/35 shadow-[0_0_15px_rgba(167,139,250,0.15)]" : "bg-[#141927] border-white/5"
                                            )}
                                        >
                                            <span className="text-xl">{emoji}</span>
                                            <span className={cn("text-[10px] font-bold", isSel ? "text-[#a78bfa]" : "text-zinc-500")}>{q}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mb-8">
                            <textarea
                                className="w-full bg-[#141927] border border-white/5 rounded-[16px] p-4 text-sm text-[#f5f0e8] placeholder:text-zinc-600 focus:outline-none focus:border-[#a78bfa]/50 resize-none h-20"
                                placeholder="e.g. Woke up once, felt rested..."
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full py-4 rounded-[16px] flex items-center justify-center gap-2 text-white font-bold text-[15px] shadow-[0_0_20px_rgba(124,58,237,0.3)] active:scale-[0.98] transition-transform"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
                        >
                            <Check className="w-5 h-5" />
                            Save Sleep Entry
                        </button>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {toastVisible && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60]" style={{ animation: 'fade-in 0.2s ease-out' }}>
                    <div className="bg-[#34d399] text-[#064e3b] px-5 py-3 rounded-full shadow-[0_5px_20px_rgba(52,211,153,0.4)] flex items-center gap-2 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        Sleep entry saved!
                    </div>
                </div>
            )}

        </div>
    );
}
