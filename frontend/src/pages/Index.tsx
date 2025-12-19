import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Activity, Utensils } from "lucide-react";

export default function Index() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 bg-[#0F1020] relative overflow-hidden text-white font-sans selection:bg-purple-500/30">
            {/* Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1020] via-[#1A1B3A] to-[#0F1020] z-0"></div>

            {/* Background Decor - Glowing Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[80px] pointer-events-none animate-pulse-gentle"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
                {/* Logo - Smaller */}
                <div className="mb-6 animate-fade-in">
                    <img src="/logo.png" alt="FitSnapAI Logo" className="h-24 w-auto object-contain drop-shadow-lg" />
                </div>

                {/* Heading - Tighter */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 leading-tight tracking-tight font-heading animate-slide-up">
                    Your Personal <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 drop-shadow-sm">
                        AI Coach
                    </span>
                </h1>

                {/* Subtitle - Compact */}
                <p className="text-white/60 text-center max-w-xs md:max-w-md mb-8 text-base leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
                    Snap photos of meals, get instant nutrition insights,
                    and follow a plan built just for <span className="text-white font-medium">you</span>.
                </p>

                {/* Feature Pills - Smaller padding/gap */}
                <div className="flex gap-2 mb-8 flex-wrap justify-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                    <span className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium flex items-center gap-1.5 text-white/90 hover:bg-white/10 transition-colors cursor-default">
                        <Utensils className="h-3.5 w-3.5 text-purple-400" /> AI Scan
                    </span>
                    <span className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium flex items-center gap-1.5 text-white/90 hover:bg-white/10 transition-colors cursor-default">
                        <Activity className="h-3.5 w-3.5 text-emerald-400" /> Plans
                    </span>
                    <span className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium flex items-center gap-1.5 text-white/90 hover:bg-white/10 transition-colors cursor-default">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Insights
                    </span>
                </div>

                {/* CTA Buttons - Compact */}
                <div className="flex flex-col gap-3 w-full animate-scale-in" style={{ animationDelay: "300ms" }}>
                    <Button
                        onClick={() => navigate("/signup")}
                        className="w-full h-12 text-base font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-purple transition-all hover:scale-[1.02] active:scale-[0.98] border-none"
                    >
                        Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="w-full h-12 text-base rounded-full border border-white/20 hover:bg-white/10 text-white bg-transparent transition-all backdrop-blur-sm"
                    >
                        I have an account
                    </Button>
                </div>

                {/* Footer / Social Proof - Closer */}
                <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
                    <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mb-3">Trusted by 50,000+ healthy eaters</p>
                    <div className="flex justify-center -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-[#1A1B3A] bg-secondary overflow-hidden shadow-lg">
                                <img src={`https://i.pravatar.cc/100?img=${i + 5}`} alt="user" className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
