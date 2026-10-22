import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/common/button";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export default function PersonalInfo() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { profile } = useProfile();

    const userInfo = {
        name: profile?.full_name || user?.full_name || "FitSnap Member",
        email: profile?.email || user?.email || "user@fitsnap.com",
        phone: "+1 (555) 123-4567",
        dob: "Jan 1, 1995",
        location: "New York, USA"
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
                        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Personal Information</h1>
                        <p className="text-xs text-[#64748B]">Manage your account identity and contact records</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0]">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
                            <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
                                <User size={30} />
                            </div>
                            <div>
                                <h2 className="font-extrabold text-lg text-[#0F172A]">{userInfo.name}</h2>
                                <p className="text-[#64748B] text-xs font-mono">{userInfo.email}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                <Mail className="w-5 h-5 text-[#16A34A] mt-0.5" />
                                <div>
                                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">Email Address</label>
                                    <p className="font-semibold text-sm text-[#0F172A]">{userInfo.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">Contact Phone</label>
                                    <p className="font-semibold text-sm text-[#0F172A]">{userInfo.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                                <div>
                                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">Date of Birth</label>
                                    <p className="font-semibold text-sm text-[#0F172A]">{userInfo.dob}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                                <div>
                                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">Primary Location</label>
                                    <p className="font-semibold text-sm text-[#0F172A]">{userInfo.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => navigate('/profile', { state: { isEditing: true } })}
                        className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white rounded-2xl h-12 font-bold text-sm shadow-sm transition-all active:scale-[0.99]"
                    >
                        Edit Profile Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
