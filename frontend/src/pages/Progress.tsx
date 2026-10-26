import { Flame, Trophy, TrendingUp, Calendar, Zap, CheckCircle2, Dumbbell, Footprints } from "lucide-react";
import { cn } from "@/utils/utils";

export default function Progress() {
    return (
        <div className="min-h-screen w-full bg-[#F3F6F8] pb-32 text-[#0F172A] p-4 sm:p-6 lg:p-8 animate-fade-in font-sans">
            <div className="max-w-[1440px] mx-auto">
                <header className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Your Progress</h1>
                    <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">Track your workout consistency, weekly milestones, and body evolution.</p>
                </header>

                <div className="space-y-6">
                    {/* AI Coach Insight */}
                    <div className="bg-[#F0FDF4] border border-[#BBF7D0] shadow-sm rounded-3xl p-6 text-[#0F172A]">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#BBF7D0]">
                                <Zap className="w-6 h-6 text-[#16A34A]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-1 text-[#0F172A]">Coach Insight</h3>
                                <p className="text-[#15803D] leading-relaxed text-sm font-medium">
                                    "You're crushing it! Your consistency on <span className="font-bold text-[#0F172A]">Leg Days</span> is improving your overall metabolic burn. Keep maintaining that 3-day streak!"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border border-[#E2E8F0] shadow-sm bg-white rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-2xl text-amber-600">
                                <Flame className="w-5 h-5 fill-amber-600" />
                            </div>
                            <div>
                                <span className="block text-2xl font-extrabold text-[#0F172A]">12</span>
                                <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Day Streak</span>
                            </div>
                        </div>

                        <div className="border border-[#E2E8F0] shadow-sm bg-white rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-2xl text-blue-600">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-extrabold text-[#0F172A]">85%</span>
                                <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Goal Met</span>
                            </div>
                        </div>

                        <div className="border border-[#E2E8F0] shadow-sm bg-white rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-2.5 rounded-2xl text-[#16A34A]">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-extrabold text-[#0F172A]">-2.4 <span className="text-xs text-[#64748B] font-normal">kg</span></span>
                                <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Net Weight Change</span>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Activity */}
                    <div className="border border-[#E2E8F0] shadow-sm rounded-3xl bg-white p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-base text-[#0F172A]">Weekly Activity Distribution</h3>
                            <span className="text-xs text-[#64748B] font-semibold bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#E2E8F0]">Dec 11 - 17</span>
                        </div>

                        <div className="flex justify-between items-end gap-3 h-36">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                                const height = [40, 70, 30, 85, 50, 90, 20][i];
                                const isToday = i === 3;
                                return (
                                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                        <div className="w-full relative h-full flex items-end">
                                            <div
                                                className={cn(
                                                    "w-full rounded-t-xl transition-all duration-300",
                                                    isToday ? "bg-[#16A34A]" : "bg-[#F1F5F9] group-hover:bg-[#16A34A]/40"
                                                )}
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold",
                                            isToday ? "text-[#16A34A]" : "text-[#64748B]"
                                        )}>{day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-base text-[#0F172A] px-1">Recent Activity Log</h3>

                        <div className="space-y-3">
                            {[
                                { title: "Upper Body Hypertrophy Session", time: "Today, 9:00 AM", icon: Dumbbell, color: "bg-blue-50 text-blue-600 border-blue-200" },
                                { title: "Hit Daily 10k Step Milestone", time: "Yesterday, 8:30 PM", icon: Footprints, color: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]" },
                                { title: "Logged High-Protein Breakfast", time: "Yesterday, 9:15 AM", icon: Calendar, color: "bg-amber-50 text-amber-600 border-amber-200" },
                            ].map((item, i) => (
                                <div key={i} className="border border-[#E2E8F0] shadow-sm rounded-2xl bg-white p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className={cn("p-2.5 rounded-xl border", item.color)}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-[#0F172A] text-sm truncate">{item.title}</h4>
                                        <p className="text-xs text-[#64748B] font-medium">{item.time}</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
