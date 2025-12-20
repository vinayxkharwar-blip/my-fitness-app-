import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, TrendingUp, Calendar, Zap, CheckCircle2, Dumbbell, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Progress() {
    return (
        <div className="min-h-screen w-full bg-background pb-40 text-foreground p-6 animate-fade-in font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-heading text-slate-900">Your Progress</h1>
                <p className="text-muted-foreground">Track your journey and milestones.</p>
            </header>

            <div className="space-y-6">
                {/* AI Coach Insight */}
                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-none shadow-lg text-white">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                <Zap className="w-6 h-6 text-yellow-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Coach Insight</h3>
                                <p className="text-indigo-50 leading-relaxed text-sm">
                                    "You're crushing it! Your consistency on <span className="font-semibold text-white">Leg Days</span> is improving your overall stability. Keep maintaining that 3-day streak!"
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <Card className="border-border/50 shadow-sm bg-orange-50/50">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                <Flame className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-slate-900">12</span>
                                <span className="text-xs text-muted-foreground font-medium">Day Streak</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm bg-blue-50/50">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-slate-900">85%</span>
                                <span className="text-xs text-muted-foreground font-medium">Goal Met</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm bg-emerald-50/50">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-slate-900">-2.4</span>
                                <span className="text-xs text-muted-foreground font-medium">kg Lost</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Ring / Weekly Activity (Simplified Visual) */}
                <Card className="border-border shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg text-slate-900">Weekly Activity</h3>
                            <span className="text-sm text-muted-foreground">Dec 11 - 17</span>
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
                                                    isToday ? "bg-primary" : "bg-slate-100 group-hover:bg-primary/50"
                                                )}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        </div>
                                        <span className={cn(
                                            "text-xs font-medium",
                                            isToday ? "text-primary" : "text-muted-foreground"
                                        )}>{day}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity Timeline */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-900 px-1">Recent Activity</h3>

                    <div className="space-y-3">
                        {[
                            { title: "Upper Body Power", time: "Today, 9:00 AM", icon: Dumbbell, color: "bg-blue-100 text-blue-600" },
                            { title: "Hit Daily Step Goal", time: "Yesterday, 8:30 PM", icon: Footprints, color: "bg-emerald-100 text-emerald-600" },
                            { title: "Logged Breakfast", time: "Yesterday, 9:15 AM", icon: Calendar, color: "bg-orange-100 text-orange-600" },
                        ].map((item, i) => (
                            <Card key={i} className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className={cn("p-2.5 rounded-xl", item.color)}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.time}</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-muted-foreground/30" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
