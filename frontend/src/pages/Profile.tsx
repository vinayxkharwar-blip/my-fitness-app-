import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, ChevronRight, Settings, User, Bell, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
    full_name: string;
    email: string;
    height_cm: number | null;
    weight_kg: number | null;
    activity_level: string | null;
    goal: string | null;
    profile_image?: string;
}

export default function Profile() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=5");
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) return;

                const user = JSON.parse(storedUser);
                const userId = user.id || user.user_id;

                if (!userId) return;

                const response = await fetch(`http://localhost:5000/profile/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    // Use saved image if available
                    if (data.profile_image) {
                        setProfileImage(data.profile_image);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result as string;
                setProfileImage(base64Image); // Instant UI update

                // Persist to backend
                try {
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        const user = JSON.parse(storedUser);
                        const userId = user.id || user.user_id;

                        await fetch("http://localhost:5000/profile/update", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                user_id: userId,
                                profile_image: base64Image
                            })
                        });
                    }
                } catch (err) {
                    console.error("Failed to save profile image", err);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Calculate BMI
    const bmi = profileData?.weight_kg && profileData?.height_cm
        ? (profileData.weight_kg / ((profileData.height_cm / 100) ** 2)).toFixed(1)
        : "--";

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-32 animate-fade-in relative font-sans selection:bg-[#9ED9E6]/30">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />

            {/* HEADER - Light Card */}
            <div className="bg-white m-6 mb-0 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 text-center relative overflow-hidden border border-white">
                {/* Soft background glow */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#9ED9E6]/20 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center px-2 mb-2 absolute top-0 w-full left-0">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-gray-100 text-gray-500">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="relative inline-block mb-4 mt-6">
                        <div className="h-28 w-28 rounded-full p-1 bg-white shadow-lg relative">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover border-4 border-white"
                            />
                        </div>
                        <button
                            className="absolute bottom-1 right-1 bg-[#FFA07A] p-2 rounded-full shadow-md text-white hover:scale-110 transition-transform hover:bg-[#FF8C60] border-2 border-white"
                            onClick={handleEditClick}
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-[#1F2937] mb-1 tracking-tight">
                        {profileData?.full_name || "Loading..."}
                    </h1>
                    <p className="text-[#5FB3B3] font-bold text-xs bg-[#E0F2FE] px-4 py-1.5 rounded-full inline-block">
                        {profileData?.goal ? profileData.goal.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Goal not set"}
                    </p>
                </div>
            </div>

            {/* STATS ROW - Light Cards */}
            <div className="grid grid-cols-3 gap-3 px-6 -mt-8 relative z-10 mb-8">
                <div className="bg-white rounded-2xl p-3 pt-6 shadow-xl shadow-blue-900/5 border border-white text-center animate-slide-up" style={{ animationDelay: "100ms" }}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Weight</span>
                    <span className="text-lg font-bold text-[#1F2937]">
                        {profileData?.weight_kg || "--"}
                        <span className="text-xs font-normal text-gray-400 ml-0.5">kg</span>
                    </span>
                </div>
                <div className="bg-white rounded-2xl p-3 pt-6 shadow-xl shadow-blue-900/5 border border-white text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Height</span>
                    <span className="text-lg font-bold text-[#1F2937]">
                        {profileData?.height_cm || "--"}
                        <span className="text-xs font-normal text-gray-400 ml-0.5">cm</span>
                    </span>
                </div>
                <div className="bg-white rounded-2xl p-3 pt-6 shadow-xl shadow-blue-900/5 border border-white text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">BMI</span>
                    <span className="text-lg font-bold text-[#FFA07A]">{bmi}</span>
                </div>
            </div>

            {/* SETTINGS LIST - Minimal Light */}
            <div className="px-6 space-y-6">
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Preferences</h3>
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
                        {[
                            { icon: User, label: "Personal Information" },
                            { icon: Bell, label: "Notifications" },
                            { icon: Settings, label: "App Settings" }
                        ].map((item, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0 border-dashed">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-[#F0F9FF] text-[#9ED9E6] group-hover:bg-[#9ED9E6] group-hover:text-white transition-colors">
                                        <item.icon size={18} />
                                    </div>
                                    <span className="font-bold text-[#1F2937] text-sm">{item.label}</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#9ED9E6] transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Privacy</h3>
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
                        <div className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0 border-dashed">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] text-[#9ED9E6] group-hover:bg-[#9ED9E6] group-hover:text-white transition-colors">
                                    <Shield size={18} />
                                </div>
                                <span className="font-bold text-[#1F2937] text-sm">Privacy Policy</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#9ED9E6] transition-colors" />
                        </div>
                        <div
                            onClick={handleLogout}
                            className="group flex items-center justify-between p-4 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-red-50 text-red-400 group-hover:bg-red-100 transition-colors">
                                    <LogOut size={18} />
                                </div>
                                <span className="font-bold text-red-500 text-sm">Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
