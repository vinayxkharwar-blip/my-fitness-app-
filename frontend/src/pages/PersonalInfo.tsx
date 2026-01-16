import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/common/button";
import { useAuth } from "@/context/AuthContext";

export default function PersonalInfo() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Mock data - in real app would fetch detailed profile
    const userInfo = {
        name: user?.full_name || "User Name",
        email: user?.email || "user@example.com",
        phone: "+1 (555) 123-4567",
        dob: "Jan 1, 1995",
        location: "New York, USA"
    };

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] p-6 font-sans selection:bg-[#9ED9E6]/30">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-white hover:bg-gray-50 text-gray-600 shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">Personal Info</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 border border-white">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#9ED9E6]">
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-[#1F2937]">{userInfo.name}</h2>
                            <p className="text-gray-400 text-sm">Personal Details</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                                <p className="font-medium text-[#1F2937]">{userInfo.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                                <p className="font-medium text-[#1F2937]">{userInfo.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date of Birth</label>
                                <p className="font-medium text-[#1F2937]">{userInfo.dob}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</label>
                                <p className="font-medium text-[#1F2937]">{userInfo.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => navigate('/profile', { state: { isEditing: true } })}
                    className="w-full bg-[#1F2937] hover:bg-black text-white rounded-[2rem] h-14 font-bold text-lg shadow-xl shadow-blue-900/10 transition-all active:scale-[0.98]"
                >
                    Edit Details
                </Button>
            </div>
        </div>
    );
}
