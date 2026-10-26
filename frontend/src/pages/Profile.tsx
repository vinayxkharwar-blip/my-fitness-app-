import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Edit2, ChevronRight, Settings, User, Bell, Shield, LogOut, Target, Scale } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
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
    const { user, logout } = useAuth();
    const { profile: profileData, updateProfile, isUpdating } = useProfile();

    const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=5");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const location = useLocation();
    const [isEditing, setIsEditing] = useState(() => {
        return location.state && location.state.isEditing ? true : false;
    });
    const [editData, setEditData] = useState<Partial<UserProfile>>({});

    useEffect(() => {
        if (profileData) {
            setEditData(profileData);
            if (profileData.profile_image) {
                setProfileImage(profileData.profile_image);
            }
        }
    }, [profileData]);

    const handleLogout = () => {
        logout();
    };

    const handleEditImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveProfile = () => {
        updateProfile(editData, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setProfileImage(base64Image);
                updateProfile({ profile_image: base64Image });
            };
            reader.readAsDataURL(file);
        }
    };

    const currentWeight = isEditing ? (editData.weight_kg || 0) : (profileData?.weight_kg || user?.weight_kg || 70);
    const currentHeight = isEditing ? (editData.height_cm || 0) : (profileData?.height_cm || user?.height_cm || 175);

    const bmi = currentWeight && currentHeight
        ? (currentWeight / ((currentHeight / 100) ** 2)).toFixed(1)
        : "--";

    return (
        <div className="min-h-screen w-full bg-[#F3F6F8] text-[#0F172A] font-sans pb-28 md:pb-12">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />

            {/* Top Navigation Bar */}
            <div className="border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md sticky top-0 z-20">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-all active:scale-95 text-[#0F172A]"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#64748B]" />
                    </button>
                    <h1 className="text-base font-bold text-[#0F172A] tracking-tight">Member Profile</h1>
                    <button
                        disabled={isUpdating}
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 ${
                            isEditing 
                                ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm' 
                                : 'bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A]'
                        }`}
                    >
                        {isEditing ? (isUpdating ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
                    </button>
                </div>
            </div>

            {/* Main Content Container */}
            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: HERO PROFILE & STATS (COL 1-5) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        {/* Profile Hero Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-[#F0FDF4] rounded-full blur-2xl pointer-events-none" />

                            <div className="relative mb-5">
                                <div className="h-24 w-24 rounded-full p-1 bg-[#F8FAFC] border-2 border-[#16A34A]/40 shadow-md overflow-hidden">
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={handleEditImageClick}
                                    title="Change Photo"
                                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#16A34A] hover:bg-[#15803D] flex items-center justify-center text-white shadow-md border-2 border-white hover:scale-110 active:scale-95 transition-transform"
                                >
                                    <Edit2 size={13} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Name & Email */}
                            <div className="w-full text-center">
                                {isEditing ? (
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            value={editData.full_name !== undefined ? editData.full_name : (profileData?.full_name || user?.full_name || "")}
                                            onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                                            placeholder="Your Full Name"
                                            className="text-center bg-[#F8FAFC] border border-[#16A34A]/40 rounded-xl px-4 py-1.5 text-[#0F172A] font-bold text-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                                        />
                                    </div>
                                ) : (
                                    <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                                        {profileData?.full_name || user?.full_name || "FitSnap Member"}
                                    </h2>
                                )}
                                <p className="text-xs text-[#64748B] mt-1 font-mono">{profileData?.email || user?.email || ""}</p>
                            </div>

                            {/* Status Tag */}
                            <div className="mt-4 px-3.5 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                                <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider">Premium Active Athlete</span>
                            </div>
                        </div>

                        {/* Body Metrics Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                                <Scale className="w-4 h-4 text-[#16A34A]" />
                                Body Composition Metrics
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                {/* Weight */}
                                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Weight</span>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editData.weight_kg || ""}
                                            onChange={(e) => setEditData({ ...editData, weight_kg: parseFloat(e.target.value) })}
                                            className="w-16 text-center bg-white border border-[#16A34A]/40 rounded-lg text-[#0F172A] font-bold text-base py-0.5 focus:outline-none"
                                        />
                                    ) : (
                                        <span className="text-xl font-extrabold text-[#0F172A]">{currentWeight} <span className="text-xs text-[#64748B] font-normal">kg</span></span>
                                    )}
                                </div>

                                {/* Height */}
                                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Height</span>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editData.height_cm || ""}
                                            onChange={(e) => setEditData({ ...editData, height_cm: parseFloat(e.target.value) })}
                                            className="w-16 text-center bg-white border border-[#16A34A]/40 rounded-lg text-[#0F172A] font-bold text-base py-0.5 focus:outline-none"
                                        />
                                    ) : (
                                        <span className="text-xl font-extrabold text-[#0F172A]">{currentHeight} <span className="text-xs text-[#64748B] font-normal">cm</span></span>
                                    )}
                                </div>

                                {/* BMI */}
                                <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider mb-1">BMI</span>
                                    <span className="text-xl font-extrabold text-[#16A34A]">{bmi}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: PREFERENCES & SETTINGS (COL 6-12) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* Fitness Goal Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4 text-[#16A34A]" />
                                Active Fitness Strategy
                            </h3>
                            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold text-[#64748B] block mb-0.5">Primary Focus</span>
                                    <span className="text-base font-extrabold text-[#16A34A] uppercase tracking-wider">
                                        {profileData?.goal?.replace("_", " ") || user?.goal || "Maintain Weight"}
                                    </span>
                                </div>
                                <span className="text-xs text-[#64748B] bg-white px-2.5 py-1 rounded-lg border border-[#E2E8F0]">Auto-tuned macros</span>
                            </div>
                        </div>

                        {/* Account Navigation Menu */}
                        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-4 pl-1">
                                System Preferences
                            </h3>

                            <div className="flex flex-col gap-3">
                                
                                <div
                                    onClick={() => navigate('/profile/personal-info')}
                                    className="flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-2xl border border-[#E2E8F0] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#0F172A] text-sm block">Personal Information</span>
                                            <span className="text-xs text-[#64748B]">Update contact & physical metrics</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-[#94A3B8] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all" />
                                </div>

                                <div
                                    onClick={() => navigate('/profile/notifications')}
                                    className="flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-2xl border border-[#E2E8F0] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                                            <Bell size={18} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#0F172A] text-sm block">Notifications</span>
                                            <span className="text-xs text-[#64748B]">Reminders for hydration & logging</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-[#94A3B8] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all" />
                                </div>

                                <div
                                    onClick={() => navigate('/profile/settings')}
                                    className="flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-2xl border border-[#E2E8F0] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center border border-[#BBF7D0]">
                                            <Settings size={18} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#0F172A] text-sm block">App Settings</span>
                                            <span className="text-xs text-[#64748B]">Measurement units, goals & cache</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-[#94A3B8] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all" />
                                </div>

                                <div
                                    className="flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-2xl border border-[#E2E8F0] transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                                            <Shield size={18} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#0F172A] text-sm block">Privacy & Security</span>
                                            <span className="text-xs text-[#64748B]">JWT sessions & data protection</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-[#94A3B8] group-hover:text-[#0F172A] group-hover:translate-x-0.5 transition-all" />
                                </div>

                                {/* LOGOUT ACTION */}
                                <div
                                    onClick={handleLogout}
                                    className="flex items-center justify-between p-4 bg-[#FFF1F2] hover:bg-[#FFE4E6] rounded-2xl border border-[#FECDD3] transition-all cursor-pointer mt-2 group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E11D48] flex items-center justify-center">
                                            <LogOut size={18} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[#E11D48] text-sm block">Log Out of FitSnap</span>
                                            <span className="text-xs text-rose-500">Securely terminate active session</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-[#E11D48] group-hover:translate-x-1 transition-transform" />
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </main>

        </div>
    );
}
