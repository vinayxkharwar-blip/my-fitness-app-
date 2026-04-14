import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Globe, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/button";

export default function AppSettings() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-background p-6 font-sans selection:bg-primary/30">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full bg-card hover:bg-muted text-muted-foreground shadow-sm border border-white dark:border-border/10">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">App Settings</h1>
            </div>

            <div className="space-y-6">

                <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-3">General</h3>
                    <div className="bg-card rounded-[2rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-border/50 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-secondary text-muted-foreground">
                                    <Moon size={20} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Dark Mode</span>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded">System</span>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-secondary text-muted-foreground">
                                    <Globe size={20} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Language</span>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground px-2 py-1">English</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-3">Support</h3>
                    <div className="bg-card rounded-[2rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-white dark:border-border/10 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-border/50 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                                    <HelpCircle size={20} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Help Center</span>
                            </div>
                            <ChevronRight size={16} className="text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                                    <Shield size={20} />
                                </div>
                                <span className="font-bold text-foreground text-sm">Terms & Privacy</span>
                            </div>
                            <ChevronRight size={16} className="text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8">
                    <p className="text-xs text-muted-foreground font-bold">FitSnap v1.0.2</p>
                </div>
            </div>
        </div>
    );
}
