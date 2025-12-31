import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, TrendingUp, Calendar, Zap, CheckCircle2, Dumbbell, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Progress() {
    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-32 text-[#1F2937] p-6 animate-fade-in font-sans selection:bg-[#9ED9E6]/30">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold font-heading text-[#1F2937] tracking-tight">Your Progress</h1>
                <p className="text-gray-500 text-sm font-medium">Track your journey and milestones.</p>
            </header>

            <div className="space-y-6">
                {/* AI Coach Insight */}
                <Card className="bg-[#F0F9FF] border-[#E0F2FE] shadow-xl shadow-blue-900/5 text-[#1F2937] rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#E0F2FE]">
                                <Zap className="w-6 h-6 text-[#9ED9E6]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-[#1F2937]">Coach Insight</h3>
                                <p className="text-[#5FB3B3] leading-relaxed text-sm font-medium">
                                    "You're crushing it! Your consistency on <span className="font-bold text-[#1F2937]">Leg Days</span> is improving your overall stability. Keep maintaining that 3-day streak!"
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <Card className="border-white shadow-xl shadow-blue-900/5 bg-white rounded-[2rem]">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-[#FFF7ED] p-2.5 rounded-2xl text-[#FFA07A]">
                                <Flame className="w-5 h-5" fill="#FFA07A" />
                            </div>
                            <div>
                                <span className="block text-2xl font-extrabold text-[#1F2937] font-heading">12</span>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Day Streak</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white shadow-xl shadow-blue-900/5 bg-white rounded-[2rem]">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-[#E0F2FE] p-2.5 rounded-2xl text-[#9ED9E6]">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-extrabold text-[#1F2937] font-heading">85%</span>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Goal Met</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white shadow-xl shadow-blue-900/5 bg-white rounded-[2rem]">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-[#F0FDF4] p-2.5 rounded-2xl text-[#4ADE80]">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-extrabold text-[#1F2937] font-heading">-2.4</span>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">kg Lost</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Ring / Weekly Activity (Simplified Visual) */}
                <Card className="border-white shadow-xl shadow-blue-900/5 rounded-[2.5rem] bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-[#1F2937]">Weekly Activity</h3>
                            <span className="text-xs text-gray-400 font-medium">Dec 11 - 17</span>
                        </div>

                        <div className="flex justify-between items-end gap-2 h-32">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                                const height = [40, 70, 30, 85, 50, 90, 20][i]; // Mock heights percentage
                                const isToday = i === 3; // Mock today
                                return (
                                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                        <div className="w-full relative h-full flex items-end">
                                            <div
                                                className={cn(
                                                    "w-full rounded-t-lg transition-all duration-500",
                                                    isToday ? "bg-[#FFA07A]" : "bg-gray-100 group-hover:bg-[#FFA07A]/50"
                                                )}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold",
                                            isToday ? "text-[#FFA07A]" : "text-gray-400"
                                        )}>{day}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity Timeline */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-[#1F2937] px-1">Recent Activity</h3>

                    <div className="space-y-3">
                        {[
                            { title: "Upper Body Power", time: "Today, 9:00 AM", icon: Dumbbell, color: "bg-[#E0F2FE] text-[#9ED9E6]" },
                            { title: "Hit Daily Step Goal", time: "Yesterday, 8:30 PM", icon: Footprints, color: "bg-[#F0FDF4] text-[#4ADE80]" },
                            { title: "Logged Breakfast", time: "Yesterday, 9:15 AM", icon: Calendar, color: "bg-[#FFF7ED] text-[#FFA07A]" },
                        ].map((item, i) => (
                            <Card key={i} className="border-white shadow-xl shadow-blue-900/5 hover:scale-[1.01] transition-transform rounded-[2rem] bg-white">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className={cn("p-2.5 rounded-2xl", item.color)}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[#1F2937] text-sm">{item.title}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-gray-200" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
