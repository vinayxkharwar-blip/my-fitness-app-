import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Edit2, ChevronRight, Settings, User, Bell, Shield, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";

interface UserProfile {
    full_name: string;
    email: string;
    height_cm: number | null;
    weight_kg: number | null;
    activity_level: string | null;
    goal: string | null;
    profile_image?: string;
}

// Static demo user - no auth dependency
const user = { id: "demo-user", full_name: "FitSnap User" };

export default function Profile() {
    const navigate = useNavigate();
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
        // No-op - no auth to logout from
        navigate("/");
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
    }

    const currentWeight = isEditing ? (editData.weight_kg || 0) : (profileData?.weight_kg || 0);
    const currentHeight = isEditing ? (editData.height_cm || 0) : (profileData?.height_cm || 0);

    const bmi = currentWeight && currentHeight
        ? (currentWeight / ((currentHeight / 100) ** 2)).toFixed(1)
        : "--";

    return (
        <div className="min-h-full w-full bg-[#0b0f1a] text-[#f5f0e8] relative font-sans selection:bg-[#34d399]/30 scrollbar-hide pb-20 md:pb-6">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />

            {/* Inject Font */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sora:wght@100..800&display=swap');
                `}
            </style>

            {/* Top Navigation */}
            <div className="flex justify-between items-center px-6 pt-12 pb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-[#141927] flex items-center justify-center border border-white/5 shadow-md active:scale-95 transition-transform"
                >
                    <ChevronLeft className="w-5 h-5 text-[#f5f0e8]" />
                </button>
                <button
                    disabled={isUpdating}
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="text-[#34d399] font-semibold tracking-wide active:opacity-70 transition-opacity"
                >
                    {isEditing ? (isUpdating ? 'Saving...' : 'Save') : 'Edit'}
                </button>
            </div>

            {/* Center Hero */}
            <div className="flex flex-col items-center mt-2 px-6">
                <div className="relative mb-4">
                    <div
                        className="h-[88px] w-[88px] rounded-full p-[2px] relative z-10 bg-[#0b0f1a]"
                        style={{
                            border: '2px solid rgba(52,211,153,0.3)',
                            boxShadow: '0 0 0 4px rgba(52,211,153,0.08)'
                        }}
                    >
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                    {/* Edit Dot */}
                    <button
                        className="absolute bottom-0 right-[-4px] w-[28px] h-[28px] rounded-full flex items-center justify-center z-20 active:scale-90 transition-transform shadow-lg border-[2px] border-[#0b0f1a]"
                        style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}
                        onClick={handleEditImageClick}
                    >
                        <Edit2 size={12} className="text-[#0b0f1a]" strokeWidth={3} />
                    </button>
                    {/* Soft Halo */}
                    <div className="absolute inset-0 bg-[#34d399]/10 blur-xl rounded-full scale-125 z-0 pointer-events-none" />
                </div>

                <h1 className="text-[1.8rem] font-bold text-[#f5f0e8] mb-2 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {user?.full_name || profileData?.full_name || "Loading..."}
                </h1>

                {/* Health Pill */}
                <div className="px-3 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/20 flex items-center gap-1.5 mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                    <span className="text-[10px] font-bold text-[#34d399] uppercase tracking-wider">Health</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="px-6 mb-8">
                <div
                    className="bg-[#141927] rounded-[20px] p-5 shadow-lg border border-[rgba(255,255,255,0.07)]"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) 1px minmax(0, 1fr) 1px minmax(0, 1fr)',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {/* Weight */}
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Weight</span>
                        <div className="flex items-baseline gap-1">
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.weight_kg || ""}
                                    onChange={(e) => setEditData({ ...editData, weight_kg: parseFloat(e.target.value) })}
                                    className="w-14 text-center bg-[#0b0f1a] rounded text-[#f5f0e8] py-0.5 focus:outline-none border border-white/10"
                                    style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 'bold' }}
                                />
                            ) : (
                                <span className="text-[1.5rem] font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {profileData?.weight_kg || "--"}
                                </span>
                            )}
                            <span className="text-xs text-zinc-500 font-medium pb-1">kg</span>
                        </div>
                    </div>

                    <div className="w-[1px] h-8 bg-white/5" />

                    {/* Height */}
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Height</span>
                        <div className="flex items-baseline gap-1">
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editData.height_cm || ""}
                                    onChange={(e) => setEditData({ ...editData, height_cm: parseFloat(e.target.value) })}
                                    className="w-14 text-center bg-[#0b0f1a] rounded text-[#f5f0e8] py-0.5 focus:outline-none border border-white/10"
                                    style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontWeight: 'bold' }}
                                />
                            ) : (
                                <span className="text-[1.5rem] font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {profileData?.height_cm || "--"}
                                </span>
                            )}
                            <span className="text-xs text-zinc-500 font-medium pb-1">cm</span>
                        </div>
                    </div>

                    <div className="w-[1px] h-8 bg-white/5" />

                    {/* BMI */}
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">BMI</span>
                        <span className="text-[1.5rem] font-bold text-[#f97316]" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {bmi}
                        </span>
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="px-6 pb-8">
                <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.15em] mb-4 pl-2">Preferences</h3>

                <div className="flex flex-col gap-3">
                    {/* MenuItem 1 */}
                    <div
                        onClick={() => navigate('/profile/personal-info')}
                        className="flex items-center gap-[14px] p-[16px_14px] bg-[#141927] rounded-[16px] border border-[rgba(255,255,255,0.04)] shadow-md active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}>
                            <User size={18} className="text-[#34d399]" />
                        </div>
                        <span className="font-bold text-[#f5f0e8] text-[0.95rem] flex-1 truncate">Personal Information</span>
                        <ChevronRight size={18} className="text-zinc-600" strokeWidth={2.5} />
                    </div>

                    {/* MenuItem 2 */}
                    <div
                        onClick={() => navigate('/profile/notifications')}
                        className="flex items-center gap-[14px] p-[16px_14px] bg-[#141927] rounded-[16px] border border-[rgba(255,255,255,0.04)] shadow-md active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}>
                            <Bell size={18} className="text-[#34d399]" />
                        </div>
                        <span className="font-bold text-[#f5f0e8] text-[0.95rem] flex-1 truncate">Notifications</span>
                        <ChevronRight size={18} className="text-zinc-600" strokeWidth={2.5} />
                    </div>

                    {/* MenuItem 3 */}
                    <div
                        onClick={() => navigate('/profile/settings')}
                        className="flex items-center gap-[14px] p-[16px_14px] bg-[#141927] rounded-[16px] border border-[rgba(255,255,255,0.04)] shadow-md active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}>
                            <Settings size={18} className="text-[#34d399]" />
                        </div>
                        <span className="font-bold text-[#f5f0e8] text-[0.95rem] flex-1 truncate">App Settings</span>
                        <ChevronRight size={18} className="text-zinc-600" strokeWidth={2.5} />
                    </div>

                    {/* MenuItem 4 */}
                    <div className="flex items-center gap-[14px] p-[16px_14px] bg-[#141927] rounded-[16px] border border-[rgba(255,255,255,0.04)] shadow-md active:scale-[0.98] transition-all cursor-pointer">
                        <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}>
                            <Shield size={18} className="text-[#34d399]" />
                        </div>
                        <span className="font-bold text-[#f5f0e8] text-[0.95rem] flex-1 truncate">Privacy & Security</span>
                        <ChevronRight size={18} className="text-zinc-600" strokeWidth={2.5} />
                    </div>

                    {/* MenuItem 5 (Danger) */}
                    <div
                        onClick={handleLogout}
                        className="flex items-center gap-[14px] p-[16px_14px] bg-[#141927] rounded-[16px] border border-[rgba(255,255,255,0.04)] shadow-md active:scale-[0.98] transition-all cursor-pointer mt-2"
                    >
                        <div className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.15)' }}>
                            <LogOut size={18} className="text-[#f87171]" />
                        </div>
                        <span className="font-bold text-[#f87171] text-[0.95rem] flex-1 truncate">Log Out</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
