import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Globe, Shield, HelpCircle, ChevronRight } from "lucide-react";

export default function AppSettings() {
    const navigate = useNavigate();

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
                        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">App Settings</h1>
                        <p className="text-xs text-[#64748B]">Display theme, locale preferences, and support resources</p>
                    </div>
                </div>

                <div className="space-y-6">

                    <div>
                        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider px-2 mb-3">Display & Locale</h3>
                        <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                                        <Sun size={20} />
                                    </div>
                                    <div>
                                        <span className="font-bold text-[#0F172A] text-sm block">Theme Appearance</span>
                                        <span className="text-xs text-[#64748B]">Clean Light Mode Active</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-lg">Light</span>
                            </div>
                            <div className="flex items-center justify-between p-4 sm:p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <span className="font-bold text-[#0F172A] text-sm block">System Language</span>
                                        <span className="text-xs text-[#64748B]">International English (US)</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-lg">English</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider px-2 mb-3">Support & Privacy</h3>
                        <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                                        <HelpCircle size={20} />
                                    </div>
                                    <div>
                                        <span className="font-bold text-[#0F172A] text-sm block">Help & Knowledge Base</span>
                                        <span className="text-xs text-[#64748B]">Guides, troubleshooting & FAQ</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-[#94A3B8]" />
                            </div>
                            <div className="flex items-center justify-between p-4 sm:p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <span className="font-bold text-[#0F172A] text-sm block">Security & Terms</span>
                                        <span className="text-xs text-[#64748B]">Privacy policy and data compliance</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-[#94A3B8]" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-6">
                        <p className="text-xs text-[#94A3B8] font-bold">FitSnap Coach v2.0 • Clean Light Edition</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
