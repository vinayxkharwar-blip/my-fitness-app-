import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Globe, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/button";

export default function AppSettings() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] p-6 font-sans selection:bg-[#9ED9E6]/30">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white hover:bg-gray-50 text-gray-600 shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">App Settings</h1>
            </div>

            <div className="space-y-6">

                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">General</h3>
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-gray-100 text-gray-600">
                                    <Moon size={20} />
                                </div>
                                <span className="font-bold text-[#1F2937] text-sm">Dark Mode</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">System</span>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-gray-100 text-gray-600">
                                    <Globe size={20} />
                                </div>
                                <span className="font-bold text-[#1F2937] text-sm">Language</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400 px-2 py-1">English</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Support</h3>
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] text-[#9ED9E6]">
                                    <HelpCircle size={20} />
                                </div>
                                <span className="font-bold text-[#1F2937] text-sm">Help Center</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300" />
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] text-[#9ED9E6]">
                                    <Shield size={20} />
                                </div>
                                <span className="font-bold text-[#1F2937] text-sm">Terms & Privacy</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300" />
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8">
                    <p className="text-xs text-gray-400 font-bold">FitSnap v1.0.2</p>
                </div>
            </div>
        </div>
    );
}
