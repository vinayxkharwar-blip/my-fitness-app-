import { Button } from "@/components/ui/button";
import { Scan, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BodyAnalysis() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8">
                
                {/* Mode Toggle */}
                <div className="flex bg-muted rounded-full p-1 mb-4 w-64">
                    <button
                        className={cn(
                            "flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200",
                             "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => navigate("/scan")}
                    >
                        Meal Scan
                    </button>
                    <button
                        className={cn(
                             "flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200",
                            "bg-white text-indigo-600 shadow-sm"
                        )}
                        onClick={() => {}}
                    >
                        Body Scan
                    </button>
                </div>

                {/* Main Visual */}
                 <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                    <div className="h-40 w-40 rounded-full bg-card border-4 border-white shadow-premium flex items-center justify-center text-indigo-600 relative z-10 transition-transform hover:scale-105 duration-300">
                        <Scan size={48} />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Analyze Your Body</h1>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-[280px] mx-auto">
                        Use AI to visually estimate body shape and posture, or enter details manually.
                    </p>
                </div>

                <div className="w-full space-y-4 pt-4">
                    <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <Scan className="mr-2 w-5 h-5" /> Start Body Scan
                    </Button>
                    
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">OR</span>
                        <div className="flex-grow border-t border-border"></div>
                    </div>

                    <Button 
                        variant="outline" 
                        className="w-full h-14 rounded-2xl text-lg font-medium border-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        onClick={() => navigate("/onboarding/measurements")}
                    >
                        <ClipboardList className="mr-2 w-5 h-5" /> Enter Body Details Manually
                    </Button>
                </div>

                 <p className="text-[10px] text-muted-foreground/60 max-w-xs pt-8">
                    * This is an AI-based visual estimation, not medical advice.
                </p>
            </div>
        </div>
    );
}
