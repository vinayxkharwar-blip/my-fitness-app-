import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, MessageSquare, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/common/button";
import { Switch } from "@/components/common/switch";
import { useState, useEffect } from "react";

export default function Notifications() {
    const navigate = useNavigate();

    const [toggles, setToggles] = useState(() => {
        const saved = localStorage.getItem("notification_settings");
        return saved ? JSON.parse(saved) : {
            workouts: true,
            meals: true,
            tips: false,
            community: true
        };
    });

    useEffect(() => {
        localStorage.setItem("notification_settings", JSON.stringify(toggles));
    }, [toggles]);

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles((prev: typeof toggles) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen w-full bg-background p-6 font-sans selection:bg-primary/30">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-card hover:bg-muted text-muted-foreground shadow-sm border border-white dark:border-border/10">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">Notifications</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-card rounded-[2rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">Workout Reminders</p>
                                <p className="text-xs text-muted-foreground">Get notified for daily exercises</p>
                            </div>
                        </div>
                        <Switch checked={toggles.workouts} onCheckedChange={() => handleToggle('workouts')} />
                    </div>

                    <div className="p-4 border-b border-gray-100 dark:border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#FFF7ED] text-[#FFA07A] dark:bg-amber-500/20 dark:text-amber-500">
                                <Bell size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">Meal Alerts</p>
                                <p className="text-xs text-muted-foreground">Remember to log your meals</p>
                            </div>
                        </div>
                        <Switch checked={toggles.meals} onCheckedChange={() => handleToggle('meals')} />
                    </div>

                    <div className="p-4 border-b border-gray-100 dark:border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-[#4ADE80] dark:bg-green-500/20 dark:text-green-500">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">Weekly Report</p>
                                <p className="text-xs text-muted-foreground">Summary of your progress</p>
                            </div>
                        </div>
                        <Switch checked={toggles.tips} onCheckedChange={() => handleToggle('tips')} />
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#F3E8FF] text-[#A855F7] dark:bg-purple-500/20 dark:text-purple-500">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">Community Updates</p>
                                <p className="text-xs text-muted-foreground">News from your coaches</p>
                            </div>
                        </div>
                        <Switch checked={toggles.community} onCheckedChange={() => handleToggle('community')} />
                    </div>
                </div>
            </div>
        </div>
    );
}
