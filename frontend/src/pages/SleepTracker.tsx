import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, BedDouble, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SleepTracker() {
    const navigate = useNavigate();
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
        <div className="min-h-screen w-full bg-[#E9EEF3] text-[#1F2937] p-6 pb-40 font-sans selection:bg-[#FFA07A]/30 relative">

            {/* Header / Back Button */}
            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-black/5 text-[#1F2937] transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#9ED9E6]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <header className="mb-8 pt-12 text-center relative z-10">
                <h1 className="text-3xl font-extrabold font-heading text-[#1F2937] tracking-tight">
                    Sleep Cycle
                </h1>
                <p className="text-gray-500 text-sm mt-1 font-medium">Master your rest & recovery.</p>
            </header>

            <div className="space-y-8 max-w-md mx-auto relative z-10">
                {/* Main Score Card */}
                <div className="flex justify-center py-4 relative">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFA07A]/10 rounded-full blur-[80px] -z-10"></div>

                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Ring Container */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="text-center z-10 flex flex-col items-center">
                                <span className="text-7xl font-extrabold font-heading text-[#1F2937] tracking-tighter drop-shadow-sm">{score}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">Sleep Score</span>
                            </div>

                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                <defs>
                                    <linearGradient id="coolGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ffcba4" /> {/* Peach */}
                                        <stop offset="100%" stopColor="#FFA07A" /> {/* Coral */}
                                    </linearGradient>
                                </defs>
                                {/* Track */}
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="110"
                                    fill="none"
                                    stroke="#F3F4F6"
                                    strokeWidth="10"
                                    className="opacity-100"
                                />
                                {/* Progress */}
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="110"
                                    fill="none"
                                    stroke="url(#coolGradient)"
                                    strokeWidth="10"
                                    strokeDasharray="691"
                                    strokeDashoffset={691 - (691 * score) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out drop-shadow-sm"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Duration Display */}
                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-[2rem] border border-white shadow-xl shadow-blue-900/5 backdrop-blur-md relative overflow-hidden group">
                        <BedDouble className="w-5 h-5 text-[#9ED9E6]" />
                        <span className="text-lg font-medium text-gray-500">
                            Total Sleep: <span className="text-[#1F2937] font-bold ml-1 tracking-wide">{duration}</span>
                        </span>
                    </div>
                </div>

                {/* Input Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white border-white shadow-sm hover:shadow-md transition-all rounded-[2rem] group cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Moon className="w-12 h-12 text-indigo-500" />
                            </div>

                            <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                                <Moon className="w-6 h-6 text-indigo-500" />
                            </div>

                            <div className="text-center w-full z-10">
                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Bedtime</span>
                                <div className="relative inline-block">
                                    <input
                                        type="time"
                                        value={bedTime}
                                        onChange={(e) => setBedTime(e.target.value)}
                                        className="text-3xl font-black text-gray-900 bg-transparent border-none p-0 text-center focus:ring-0 w-36 font-heading tracking-tight"
                                    />
                                    {/* Custom underline decoration */}
                                    <div className="h-1 w-12 bg-indigo-100 mx-auto rounded-full mt-1 group-hover:bg-indigo-300 transition-colors"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-white shadow-sm hover:shadow-md transition-all rounded-[2rem] group cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Sun className="w-12 h-12 text-amber-500" />
                            </div>

                            <div className="p-4 bg-amber-50 rounded-2xl group-hover:bg-amber-100 transition-colors">
                                <Sun className="w-6 h-6 text-amber-500" />
                            </div>

                            <div className="text-center w-full z-10">
                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Wake Up</span>
                                <div className="relative inline-block">
                                    <input
                                        type="time"
                                        value={wakeTime}
                                        onChange={(e) => setWakeTime(e.target.value)}
                                        className="text-3xl font-black text-gray-900 bg-transparent border-none p-0 text-center focus:ring-0 w-36 font-heading tracking-tight"
                                    />
                                    {/* Custom underline decoration */}
                                    <div className="h-1 w-12 bg-amber-100 mx-auto rounded-full mt-1 group-hover:bg-amber-300 transition-colors"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Tip Card */}
                <Card className="bg-[#F0F9FF] border-[#E0F2FE] shadow-sm overflow-hidden relative rounded-[2rem]">
                    <CardContent className="p-5 flex gap-4 items-start relative z-10">
                        <div className="p-2 bg-white rounded-lg shrink-0 border border-[#E0F2FE] shadow-sm">
                            <Sparkles className="w-5 h-5 text-[#9ED9E6]" />
                        </div>
                        <div>
                            <h3 className="text-[#1F2937] font-bold text-sm mb-1.5 flex items-center gap-2">
                                Coach Insight <span className="text-[10px] bg-[#E0F2FE] text-[#9ED9E6] px-1.5 py-0.5 rounded font-bold">NEW</span>
                            </h3>
                            <p className="text-[#5FB3B3] text-xs leading-relaxed font-medium">
                                "Consistent wake-up times help regulate your circadian rhythm. Try to stick to your 7:00 AM wake-up for better energy today."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Button className="w-full bg-[#FFA07A] hover:bg-[#FF8C60] text-white rounded-[2rem] h-14 font-bold text-lg shadow-xl shadow-[#FFA07A]/20 transition-all active:scale-[0.98] border-none">
                    Save Sleep Log
                </Button>
            </div>
        </div>
    );
}
