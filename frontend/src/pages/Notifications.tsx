import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, MessageSquare, Activity, Calendar } from "lucide-react";
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
        <div className="min-h-screen w-full bg-[#F3F6F8] p-4 sm:p-6 lg:p-8 font-sans pb-28">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] text-[#64748B] shadow-sm transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Notification Preferences</h1>
                        <p className="text-xs text-[#64748B]">Manage reminder triggers, meal alerts, and coaching updates</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-[#0F172A] text-sm">Workout Reminders</p>
                                    <p className="text-xs text-[#64748B]">Get notified for scheduled daily exercises</p>
                                </div>
                            </div>
                            <Switch checked={toggles.workouts} onCheckedChange={() => handleToggle('workouts')} />
                        </div>

                        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-[#0F172A] text-sm">Meal & Hydration Alerts</p>
                                    <p className="text-xs text-[#64748B]">Prompt reminders to log meals and drink water</p>
                                </div>
                            </div>
                            <Switch checked={toggles.meals} onCheckedChange={() => handleToggle('meals')} />
                        </div>

                        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-[#0F172A] text-sm">AI Coach Insights</p>
                                    <p className="text-xs text-[#64748B]">Daily habit analysis and actionable recovery tips</p>
                                </div>
                            </div>
                            <Switch checked={toggles.tips} onCheckedChange={() => handleToggle('tips')} />
                        </div>

                        <div className="p-4 sm:p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-[#0F172A] text-sm">Weekly Progress Report</p>
                                    <p className="text-xs text-[#64748B]">Weekly summary of caloric balance and activity streak</p>
                                </div>
                            </div>
                            <Switch checked={toggles.community} onCheckedChange={() => handleToggle('community')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
