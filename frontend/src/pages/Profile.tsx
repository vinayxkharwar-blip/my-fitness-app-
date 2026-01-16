import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Edit2, ChevronRight, Settings, User, Bell, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/common/button";
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

    const location = useLocation();
    // Check if we navigated here with the intention to edit
    const [isEditing, setIsEditing] = useState(() => {
        return location.state && location.state.isEditing ? true : false;
    });
    const [editData, setEditData] = useState<Partial<UserProfile>>({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) return;

                const user = JSON.parse(storedUser);
                const userId = user.id || user.user_id;

                if (!userId) {
                    console.error("No user ID found in stored user object:", user);
                    return;
                }

                console.log("Fetching profile for user ID:", userId);
                const response = await fetch(`http://localhost:5000/profile/${userId}`);
                if (response.status === 404) {
                    console.error("User not found on server. Logging out.");
                    logout();
                    navigate("/login");
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setEditData(data); // Initialize edit data
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

        // Clear the state so refreshing doesn't keep us in edit mode
        window.history.replaceState({}, document.title);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleEditImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveProfile = async () => {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) return;
            const user = JSON.parse(storedUser);
            const userId = user.id || user.user_id;

            const response = await fetch("http://localhost:5000/profile/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    ...editData
                })
            });

            if (response.ok) {
                setProfileData(editData as UserProfile);
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Failed to save profile", err);
        }
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
    const currentWeight = isEditing ? (editData.weight_kg || 0) : (profileData?.weight_kg || 0);
    const currentHeight = isEditing ? (editData.height_cm || 0) : (profileData?.height_cm || 0);

    const bmi = currentWeight && currentHeight
        ? (currentWeight / ((currentHeight / 100) ** 2)).toFixed(1)
        : "--";

    return (
        <div className="min-h-screen w-full bg-background pb-32 animate-fade-in relative font-sans selection:bg-primary/30">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />

            {/* HEADER - Card */}
            <div className="bg-card m-6 mb-0 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 dark:shadow-none text-center relative overflow-hidden border border-white dark:border-border/10">
                {/* Soft background glow */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#9ED9E6]/20 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center px-2 mb-2 absolute top-0 w-full left-0">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                            className={`rounded-full font-bold ${isEditing ? 'text-[#FFA07A] bg-[#FFF7ED] dark:bg-orange-500/10' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </div>

                    <div className="relative inline-block mb-4 mt-6">
                        <div className="h-28 w-28 rounded-full p-1 bg-white dark:bg-card shadow-lg relative">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover border-4 border-white dark:border-card"
                            />
                        </div>
                        <button
                            className="absolute bottom-1 right-1 bg-[#FFA07A] p-2 rounded-full shadow-md text-white hover:scale-110 transition-transform hover:bg-[#FF8C60] border-2 border-white dark:border-card"
                            onClick={handleEditImageClick}
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-foreground mb-1 tracking-tight capitalize">
                        {profileData?.full_name || "Loading..."}
                    </h1>

                    {isEditing ? (
                        <select
                            value={editData.goal || ""}
                            onChange={(e) => setEditData({ ...editData, goal: e.target.value })}
                            className="text-xs bg-white border border-gray-200 rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#9ED9E6] text-[#5FB3B3] font-bold mt-2"
                        >
                            <option value="lose_weight">Lose Weight</option>
                            <option value="gain_muscle">Gain Muscle</option>
                            <option value="maintain_fitness">Maintain Fitness</option>
                            <option value="improve_stamina">Improve Stamina</option>
                        </select>
                    ) : (
                        <p className="text-[#5FB3B3] font-bold text-xs bg-[#E0F2FE] px-4 py-1.5 rounded-full inline-block mt-1">
                            {profileData?.goal ? profileData.goal.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Goal not set"}
                        </p>
                    )}
                </div>
            </div>

            {/* STATS ROW - Cards */}
            <div className="grid grid-cols-3 gap-3 px-6 -mt-8 relative z-10 mb-8">
                <div className="bg-card rounded-2xl p-3 pt-6 shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 text-center animate-slide-up" style={{ animationDelay: "100ms" }}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Weight</span>
                    <span className="text-lg font-bold text-foreground flex items-center justify-center gap-1">
                        {isEditing ? (
                            <input
                                type="number"
                                value={editData.weight_kg || ""}
                                onChange={(e) => setEditData({ ...editData, weight_kg: parseFloat(e.target.value) })}
                                className="w-12 text-center bg-gray-50 rounded-md py-0.5 focus:outline-none focus:ring-1 focus:ring-[#9ED9E6]"
                            />
                        ) : (
                            profileData?.weight_kg || "--"
                        )}
                        <span className="text-xs font-normal text-gray-400">kg</span>
                    </span>
                </div>
                <div className="bg-card rounded-2xl p-3 pt-6 shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Height</span>
                    <span className="text-lg font-bold text-foreground flex items-center justify-center gap-1">
                        {isEditing ? (
                            <input
                                type="number"
                                value={editData.height_cm || ""}
                                onChange={(e) => setEditData({ ...editData, height_cm: parseFloat(e.target.value) })}
                                className="w-12 text-center bg-gray-50 rounded-md py-0.5 focus:outline-none focus:ring-1 focus:ring-[#9ED9E6]"
                            />
                        ) : (
                            profileData?.height_cm || "--"
                        )}
                        <span className="text-xs font-normal text-gray-400">cm</span>
                    </span>
                </div>
                <div className="bg-card rounded-2xl p-3 pt-6 shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">BMI</span>
                    <span className="text-lg font-bold text-[#FFA07A]">{bmi}</span>
                </div>
            </div>

            {/* SETTINGS LIST - Minimal Light */}
            <div className="px-6 space-y-6">
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Preferences</h3>
                    <div className="bg-card rounded-[2rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 overflow-hidden">
                        <div onClick={() => navigate('/profile/personal-info')} className="group flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-border/50 last:border-0 border-dashed">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] dark:bg-primary/20 text-[#9ED9E6] dark:text-primary group-hover:bg-[#9ED9E6] group-hover:text-white transition-colors">
                                    <User size={18} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Personal Information</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#9ED9E6] transition-colors" />
                        </div>
                        <div onClick={() => navigate('/profile/notifications')} className="group flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-border/50 last:border-0 border-dashed">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] dark:bg-primary/20 text-[#9ED9E6] dark:text-primary group-hover:bg-[#9ED9E6] group-hover:text-white transition-colors">
                                    <Bell size={18} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Notifications</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#9ED9E6] transition-colors" />
                        </div>
                        <div onClick={() => navigate('/profile/settings')} className="group flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-border/50 last:border-0 border-dashed">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] dark:bg-primary/20 text-[#9ED9E6] dark:text-primary group-hover:bg-[#9ED9E6] group-hover:text-white transition-colors">
                                    <Settings size={18} />
                                </div>
                                <span className="font-bold text-foreground text-sm">App Settings</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#9ED9E6] transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Privacy</h3>
                    <div className="bg-card rounded-[2rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 overflow-hidden">
                        <div className="group flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-border/50 last:border-0 border-dashed">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-[#F0F9FF] dark:bg-primary/20 text-[#9ED9E6] dark:text-primary group-hover:bg-[#9ED9E6] group-hover:text-white transition-colors">
                                    <Shield size={18} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Privacy Policy</span>
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
