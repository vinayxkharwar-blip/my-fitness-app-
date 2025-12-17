import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Activity, Utensils } from "lucide-react";

export default function Index() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-6 bg-background relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse-gentle"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-[#FFD700]/5 blur-3xl -z-10"></div>

            {/* Logo */}
            <div className="mb-8 animate-fade-in">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl flex items-center justify-center text-white text-3xl transform rotate-3">
                    <span className="">⚡</span>
                </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 leading-tight text-foreground font-heading animate-slide-up">
                Your Personal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                    AI Coach
                </span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-center max-w-lg mb-10 text-lg md:text-xl leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
                Snap photos of meals, get instant nutrition insights,
                and follow a plan built for your biology.
            </p>

            {/* Feature Pills */}
            <div className="flex gap-4 mb-12 flex-wrap justify-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                <span className="px-5 py-2.5 bg-white border border-border shadow-sm rounded-full text-sm font-medium flex items-center gap-2 text-foreground/80 hover:scale-105 transition-transform cursor-default">
                    <Utensils className="h-4 w-4 text-primary" /> AI Food Scan
                </span>
                <span className="px-5 py-2.5 bg-white border border-border shadow-sm rounded-full text-sm font-medium flex items-center gap-2 text-foreground/80 hover:scale-105 transition-transform cursor-default">
                    <Activity className="h-4 w-4 text-emerald-500" /> Smart Plans
                </span>
                <span className="px-5 py-2.5 bg-white border border-border shadow-sm rounded-full text-sm font-medium flex items-center gap-2 text-foreground/80 hover:scale-105 transition-transform cursor-default">
                    <Sparkles className="h-4 w-4 text-amber-500" /> Daily Analysis
                </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-md animate-scale-in" style={{ animationDelay: "300ms" }}>
                <Button
                    onClick={() => navigate("/signup")}
                    className="w-full h-14 text-lg rounded-full shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="w-full h-14 text-lg rounded-full border-2 border-primary/10 hover:bg-primary/5 hover:border-primary/30 text-primary transition-all bg-transparent"
                >
                    I have an account
                </Button>
            </div>

            {/* Footer / Social Proof */}
            <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
                <p className="text-sm text-muted-foreground mb-4">Trusted by 50,000+ healthy eaters</p>
                <div className="flex justify-center -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i + 5}`} alt="user" className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
