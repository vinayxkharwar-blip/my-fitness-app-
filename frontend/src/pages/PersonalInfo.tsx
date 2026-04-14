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
        <div className="min-h-screen w-full bg-background p-6 font-sans selection:bg-primary/30">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-card hover:bg-muted text-muted-foreground shadow-sm border border-white dark:border-border/10">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">Personal Info</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-card rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-foreground">{userInfo.name}</h2>
                            <p className="text-muted-foreground text-sm">Personal Details</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Email</label>
                                <p className="font-medium text-foreground">{userInfo.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Phone</label>
                                <p className="font-medium text-foreground">{userInfo.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Date of Birth</label>
                                <p className="font-medium text-foreground">{userInfo.dob}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</label>
                                <p className="font-medium text-foreground">{userInfo.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => navigate('/profile', { state: { isEditing: true } })}
                    className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-[2rem] h-14 font-bold text-lg shadow-xl shadow-blue-900/10 dark:shadow-none transition-all active:scale-[0.98]"
                >
                    Edit Details
                </Button>
            </div>
        </div>
    );
}
