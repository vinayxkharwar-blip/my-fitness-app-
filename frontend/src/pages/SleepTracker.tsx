import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Clock, Sparkles, BedDouble } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SleepTracker() {
    const [bedTime, setBedTime] = useState("23:00");
    const [wakeTime, setWakeTime] = useState("07:00");
    const [duration, setDuration] = useState("8h 0m");
    const [score, setScore] = useState(95);

    // Simple calculation when times change
    useEffect(() => {
        const calculateSleep = () => {
            const [bedH, bedM] = bedTime.split(":").map(Number);
            const [wakeH, wakeM] = wakeTime.split(":").map(Number);

            let bedDate = new Date();
            bedDate.setHours(bedH, bedM, 0);

            let wakeDate = new Date();
            wakeDate.setHours(wakeH, wakeM, 0);

            // If wake time is before bed time, assume wake time is next day
            if (wakeDate < bedDate) {
                wakeDate.setDate(wakeDate.getDate() + 1);
            }

            const diffMs = wakeDate.getTime() - bedDate.getTime();
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            setDuration(`${diffHrs}h ${diffMins}m`);

            // Mock score logic based on 8 hours ideal
            const totalHours = diffHrs + diffMins / 60;
            let calculatedScore = 85;
            if (totalHours >= 7 && totalHours <= 9) calculatedScore = 95;
            else if (totalHours < 6) calculatedScore = 70;
            else if (totalHours > 10) calculatedScore = 75;

            setScore(calculatedScore);
        };
        calculateSleep();
    }, [bedTime, wakeTime]);

    return (
        <div className="min-h-screen w-full bg-[#09090b] text-white p-6 pb-40 font-sans selection:bg-purple-500/30">
            <header className="mb-8 pt-4">
                <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                    Sleep Cycle
                </h1>
                <p className="text-zinc-400 text-sm mt-1">Master your rest & recovery.</p>
            </header>

            <div className="space-y-8 max-w-md mx-auto">
                {/* Main Score Card */}
                <div className="flex justify-center py-4 relative">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -z-10"></div>

                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Ring Container */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="text-center z-10 flex flex-col items-center">
                                <span className="text-7xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tighter drop-shadow-lg">{score}</span>
                                <span className="text-xs font-bold text-purple-300 uppercase tracking-[0.3em] mt-2">Sleep Score</span>
                            </div>

                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                <defs>
                                    <linearGradient id="coolGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                                        <stop offset="50%" stopColor="#8b5cf6" /> {/* Violet */}
                                        <stop offset="100%" stopColor="#d946ef" /> {/* Fuchsia */}
                                    </linearGradient>
                                </defs>
                                {/* Track */}
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="110"
                                    fill="none"
                                    stroke="#18181b"
                                    strokeWidth="8"
                                    className="opacity-50"
                                />
                                {/* Progress */}
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="110"
                                    fill="none"
                                    stroke="url(#coolGradient)"
                                    strokeWidth="8"
                                    strokeDasharray="691"
                                    strokeDashoffset={691 - (691 * score) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>

                            {/* Inner decorative glows */}
                            <div className="absolute inset-4 rounded-full border border-purple-500/10 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]"></div>
                        </div>
                    </div>
                </div>

                {/* Duration Display */}
                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center gap-3 bg-zinc-900/80 px-8 py-4 rounded-full border border-zinc-800 shadow-xl backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <BedDouble className="w-5 h-5 text-blue-400" />
                        <span className="text-lg font-medium text-zinc-300">
                            Total Sleep: <span className="text-white font-bold ml-1 tracking-wide">{duration}</span>
                        </span>
                    </div>
                </div>

                {/* Input Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-zinc-900/50 border-zinc-800 shadow-lg hover:border-indigo-500/30 transition-all group cursor-pointer relative overflow-hidden">
                        <CardContent className="p-6 flex flex-col items-center gap-4 relative z-10">
                            <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors"></div>

                            <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                <Moon className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            </div>

                            <div className="text-center w-full relative">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Bedtime</span>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl font-bold text-white font-heading tracking-widest">{bedTime}</span>
                                    <Clock className="w-4 h-4 text-indigo-500/50 group-hover:text-indigo-400 transition-colors" />
                                </div>
                                {/* Invisible Input Overlay */}
                                <input
                                    type="time"
                                    value={bedTime}
                                    onChange={(e) => setBedTime(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800 shadow-lg hover:border-amber-500/30 transition-all group cursor-pointer relative overflow-hidden">
                        <CardContent className="p-6 flex flex-col items-center gap-4 relative z-10">
                            <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors"></div>

                            <div className="p-3 bg-amber-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                <Sun className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                            </div>

                            <div className="text-center w-full relative">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Wake Up</span>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl font-bold text-white font-heading tracking-widest">{wakeTime}</span>
                                    <Clock className="w-4 h-4 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
                                </div>
                                {/* Invisible Input Overlay */}
                                <input
                                    type="time"
                                    value={wakeTime}
                                    onChange={(e) => setWakeTime(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Tip Card */}
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800/50 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <CardContent className="p-5 flex gap-4 items-start relative z-10">
                        <div className="p-2 bg-purple-500/10 rounded-lg shrink-0 border border-purple-500/20">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-zinc-200 font-semibold text-sm mb-1.5 flex items-center gap-2">
                                AI Insight <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20">NEW</span>
                            </h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                "Consistent wake-up times help regulate your circadian rhythm. Try to stick to your 7:00 AM wake-up for better energy today."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl h-14 font-bold text-lg shadow-lg shadow-white/5 transition-all active:scale-[0.98]">
                    Save Sleep Log
                </Button>
            </div>
        </div>
    );
}
