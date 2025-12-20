import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, ChevronRight, Settings, User, Bell, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=5");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogout = () => {
        // Clear potential auth items
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");

        // Navigate to login
        navigate("/login");
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen w-full bg-background pb-32 animate-fade-in relative font-sans">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />

            {/* HEADER - Clean White Minimal */}
            <div className="bg-card m-6 mb-0 rounded-[2.5rem] p-8 shadow-premium text-center relative overflow-hidden border border-border/20">
                {/* Soft background gradient */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/5 to-transparent -z-10"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center px-2 mb-4 absolute top-0 w-full left-0">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-secondary">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </div>

                    <div className="relative inline-block mb-4 mt-8">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-lg shadow-purple-500/20">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover border-4 border-white"
                            />
                        </div>
                        <button
                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-primary hover:scale-110 transition-transform"
                            onClick={handleEditClick}
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-foreground mb-1">Sarah Jenkins</h1>
                    <p className="text-muted-foreground font-medium text-sm bg-secondary/50 px-3 py-1 rounded-full inline-block">Marathon Training</p>
                </div>
            </div>

            {/* STATS ROW - Clean White Cards */}
            <div className="grid grid-cols-3 gap-3 px-6 -mt-6 relative z-10 mb-8">
                <div className="bg-card rounded-2xl p-3 pt-8 shadow-sm border border-border/40 text-center animate-slide-up" style={{ animationDelay: "100ms" }}>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-1">Weight</span>
                    <span className="text-lg font-bold text-foreground">62<span className="text-xs font-normal text-muted-foreground ml-0.5">kg</span></span>
                </div>
                <div className="bg-card rounded-2xl p-3 pt-8 shadow-sm border border-border/40 text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-1">Height</span>
                    <span className="text-lg font-bold text-foreground">170<span className="text-xs font-normal text-muted-foreground ml-0.5">cm</span></span>
                </div>
                <div className="bg-card rounded-2xl p-3 pt-8 shadow-sm border border-border/40 text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-1">BMI</span>
                    <span className="text-lg font-bold text-primary">21.5</span>
                </div>
            </div>

            {/* SETTINGS LIST - Minimal */}
            <div className="px-6 space-y-6">
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Preferences</h3>
                    <div className="bg-card rounded-[2rem] shadow-sm border border-border/40 overflow-hidden">
                        {[
                            { icon: User, label: "Personal Information" },
                            { icon: Bell, label: "Notifications" },
                            { icon: Settings, label: "App Settings" }
                        ].map((item, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer border-b border-border/40 last:border-0 border-dashed">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <item.icon size={18} />
                                    </div>
                                    <span className="font-medium text-foreground text-sm">{item.label}</span>
                                </div>
                                <ChevronRight size={16} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Privacy</h3>
                    <div className="bg-card rounded-[2rem] shadow-sm border border-border/40 overflow-hidden">
                        <div className="group flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer border-b border-border/40 last:border-0 border-dashed">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Shield size={18} />
                                </div>
                                <span className="font-medium text-foreground text-sm">Privacy Policy</span>
                            </div>
                            <ChevronRight size={16} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
                        </div>
                        <div
                            onClick={handleLogout}
                            className="group flex items-center justify-between p-4 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <LogOut size={18} />
                                </div>
                                <span className="font-medium text-red-600 text-sm">Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
