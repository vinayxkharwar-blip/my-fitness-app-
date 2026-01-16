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
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] p-6 font-sans selection:bg-[#9ED9E6]/30">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white hover:bg-gray-50 text-gray-600 shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">Notifications</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#F0F9FF] text-[#9ED9E6]">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-[#1F2937] text-sm">Workout Reminders</p>
                                <p className="text-xs text-gray-400">Get notified for daily exercises</p>
                            </div>
                        </div>
                        <Switch checked={toggles.workouts} onCheckedChange={() => handleToggle('workouts')} />
                    </div>

                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#FFF7ED] text-[#FFA07A]">
                                <Bell size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-[#1F2937] text-sm">Meal Alerts</p>
                                <p className="text-xs text-gray-400">Remember to log your meals</p>
                            </div>
                        </div>
                        <Switch checked={toggles.meals} onCheckedChange={() => handleToggle('meals')} />
                    </div>

                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-[#4ADE80]">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-[#1F2937] text-sm">Weekly Report</p>
                                <p className="text-xs text-gray-400">Summary of your progress</p>
                            </div>
                        </div>
                        <Switch checked={toggles.tips} onCheckedChange={() => handleToggle('tips')} />
                    </div>

                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-[#F3E8FF] text-[#A855F7]">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-[#1F2937] text-sm">Community Updates</p>
                                <p className="text-xs text-gray-400">News from your coaches</p>
                            </div>
                        </div>
                        <Switch checked={toggles.community} onCheckedChange={() => handleToggle('community')} />
                    </div>
                </div>
            </div>
        </div>
    );
}
