import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SleepTracker() {
    const [bedTime, setBedTime] = useState("23:00");
    const [wakeTime, setWakeTime] = useState("07:00");
    const [duration, setDuration] = useState("8h 0m");
    const [score, setScore] = useState(85);

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
        <div className="min-h-screen w-full bg-[#0F1020] text-slate-100 p-6 pb-40 font-sans">
            <header className="mb-8 pt-4">
                <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                    Sleep Cycle
                </h1>
                <p className="text-slate-400 text-sm">Monitor your rest and recovery.</p>
            </header>

            <div className="space-y-6 max-w-md mx-auto">
                {/* Main Score Card */}
                <div className="flex justify-center py-6">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-gentle"></div>

                        {/* Ring Container */}
                        <div className="w-full h-full rounded-full border-4 border-slate-800 flex items-center justify-center relative bg-[#15162E] shadow-xl">
                            <div className="text-center z-10">
                                <span className="text-5xl font-bold text-indigo-300 block">{score}</span>
                                <span className="text-xs text-slate-500 uppercase tracking-widest">Sleep Score</span>
                            </div>
                            {/* Decorative ring segment */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="90"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray="565"
                                    strokeDashoffset={565 - (565 * score) / 100}
                                    strokeLinecap="round"
                                    className="text-indigo-500 transition-all duration-1000 ease-out"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Duration Display */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-slate-800/50 px-5 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        <span className="text-lg font-medium text-slate-200">
                            Total Sleep: <span className="text-white">{duration}</span>
                        </span>
                    </div>
                </div>

                {/* Input Controls */}
                <Card className="bg-[#1A1B3A] border-slate-800 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 divide-x divide-slate-800">
                            <div className="p-6 flex flex-col items-center gap-3">
                                <div className="p-3 bg-indigo-900/30 rounded-full">
                                    <Moon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <span className="text-sm text-slate-400 font-medium">Bedtime</span>
                                <input
                                    type="time"
                                    value={bedTime}
                                    onChange={(e) => setBedTime(e.target.value)}
                                    className="bg-transparent text-2xl font-bold text-white text-center focus:outline-none focus:ring-1 focus:ring-indigo-500/50 rounded cursor-pointer"
                                />
                            </div>
                            <div className="p-6 flex flex-col items-center gap-3">
                                <div className="p-3 bg-amber-900/30 rounded-full">
                                    <Sun className="w-6 h-6 text-amber-400" />
                                </div>
                                <span className="text-sm text-slate-400 font-medium">Wake Up</span>
                                <input
                                    type="time"
                                    value={wakeTime}
                                    onChange={(e) => setWakeTime(e.target.value)}
                                    className="bg-transparent text-2xl font-bold text-white text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Tip Card */}
                <Card className="bg-gradient-to-r from-slate-900 to-[#1A1B3A] border-slate-800 shadow-md">
                    <CardContent className="p-5 flex gap-4 items-start">
                        <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-indigo-200 font-medium text-sm mb-1">Deep Sleep Insight</h3>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                "Consistent wake-up times help regulate your circadian rhythm. Try to stick to your 7:00 AM wake-up for better energy today."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]">
                    Save Sleep Log
                </Button>
            </div>
        </div>
    );
}
