import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button";
import { Activity, ScanFace, Utensils, Moon, Dumbbell, BookOpen } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export default function Index() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/home");
    };

    return (
        <div className="relative min-h-screen w-full bg-[#0b0f1a] text-[#f5f0e8] overflow-x-hidden selection:bg-[#34d399]/30" style={{ fontFamily: '"Sora", sans-serif' }}>

            {/* Inject Google Fonts */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sora:wght@100..800&display=swap');
                    
                    /* Custom Float Animations */
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(var(--rot)); }
                        50% { transform: translateY(-10px) rotate(var(--rot)); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                    .delay-100 { animation-delay: 100ms; }
                    .delay-200 { animation-delay: 200ms; }
                    .delay-500 { animation-delay: 500ms; }
                `}
            </style>

            {/* Ambient Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#34d399]/10 blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#4f46e5]/10 blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#d97706]/10 blur-[150px] pointer-events-none mix-blend-screen" />

            {/* Faint Grid Texture Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwaC00MHY0MGg0MHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MGgtNDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] pointer-events-none" />

            {/* Navigation */}
            <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <a href="/" className="inline-block hover:opacity-90 transition-opacity">
                    <Logo className="w-auto h-10 md:h-12" />
                </a>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#34d399] transition-colors">Features</a>
                    <a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#34d399] transition-colors">How it works</a>
                    <a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#34d399] transition-colors">Pricing</a>
                </div>


            </nav>

            {/* Hero Section */}
            <header className="relative z-10 pt-16 pb-24 lg:pt-28 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left Column: Text Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Glowing Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
                            </span>
                            <span className="text-xs font-semibold text-[#34d399] tracking-widest uppercase">AI-Powered Wellness</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Balance Body <br />
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#10b981]">
                                & Mind.
                            </span>
                        </h1>

                        <p className="text-lg text-[#f5f0e8]/70 max-w-lg leading-relaxed font-light">
                            Your personalized ecosystem for peak performance. Snap meals, track progress, and find your rhythm with a coach that actually understands you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={handleGetStarted}
                                className="h-14 px-8 rounded-full bg-[#34d399] hover:bg-[#10b981] text-[#0b0f1a] text-base font-bold shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all active:scale-95 border-none"
                            >
                                Start Your Journey
                            </Button>

                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center gap-6 pt-10 border-t border-[#f5f0e8]/10 w-fit">
                            <div>
                                <p className="text-2xl font-semibold text-[#f5f0e8]">50k+</p>
                                <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest mt-1">Users</p>
                            </div>
                            <div className="h-8 w-px bg-[#f5f0e8]/10" />
                            <div>
                                <p className="text-2xl font-semibold text-[#f5f0e8]">98%</p>
                                <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest mt-1">Satisfaction</p>
                            </div>
                            <div className="h-8 w-px bg-[#f5f0e8]/10" />
                            <div>
                                <p className="text-2xl font-semibold text-[#f5f0e8]">4.9★</p>
                                <p className="text-xs text-[#f5f0e8]/50 uppercase tracking-widest mt-1">Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Floating UI Cards */}
                    <div className="relative h-[450px] sm:h-[550px] flex items-center justify-center animate-fade-in delay-200">
                        <div className="relative w-full max-w-[340px] perspective-1000">

                            {/* Card 1: Meal Card */}
                            <div className="absolute top-[-100px] right-[-20px] w-64 bg-[#141b2d]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-[#f5f0e8]/10 animate-float" style={{ '--rot': '5deg' } as React.CSSProperties}>
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">🥑</div>
                                    <div>
                                        <p className="font-semibold text-sm">Avocado Toast</p>
                                        <p className="text-xs text-[#f5f0e8]/50">320 kcal • Balanced</p>
                                    </div>
                                    <div className="ml-auto px-2 py-1 bg-[#34d399]/20 rounded text-xs font-bold text-[#34d399]">
                                        A+
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Goal Card (Center) */}
                            <div className="relative z-20 w-full bg-[#141b2d] p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#34d399]/20 animate-float delay-100" style={{ '--rot': '0deg' } as React.CSSProperties}>
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-xs font-bold text-[#f5f0e8]/50 uppercase tracking-widest mb-1">Daily Goal</p>
                                        <p className="text-5xl font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>84<span className="text-2xl text-[#34d399]">%</span></p>
                                    </div>
                                    {/* Mini sparkline svg mock */}
                                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 28L15 20L25 25L40 10L58 2" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="relative w-full bg-[#0b0f1a] h-2 rounded-full mb-3">
                                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#10b981] to-[#34d399] w-[84%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]">
                                        {/* Glowing dot endpoint */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-[#f5f0e8]/50 font-medium">
                                    <span>2,100 kcal</span>
                                    <span>Target: 2,500</span>
                                </div>
                            </div>

                            {/* Card 3: Body Analysis */}
                            <div className="absolute bottom-[-60px] left-[-30px] w-64 bg-[#141b2d]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-[#f5f0e8]/10 animate-float delay-500" style={{ '--rot': '-4deg' } as React.CSSProperties}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#34d399]/20 flex items-center justify-center text-xl">
                                        🧘
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Posture Improved</p>
                                        <p className="text-xs text-[#34d399] font-medium flex items-center mt-0.5">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                            +8% this week
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            {/* Footer Features Strip */}
            <section className="relative z-10 border-t border-[#f5f0e8]/10 bg-[#0b0f1a]/50 py-8 backdrop-blur-sm animate-fade-in-up delay-500">
                <div className="max-w-7xl mx-auto px-6 overflow-hidden">
                    {/* Scrolling/Horizontal layout for pills */}
                    <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide pb-4 sm:pb-0 whitespace-nowrap text-sm font-medium text-[#f5f0e8]/70">
                        {[
                            { icon: Utensils, text: "Meal Scanning" },
                            { icon: Activity, text: "AI Coaching" },
                            { icon: Dumbbell, text: "Progress Tracking" },
                            { icon: ScanFace, text: "Body Analysis" },
                            { icon: BookOpen, text: "Personalized Plans" },
                            { icon: Moon, text: "Sleep Insights" },
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#34d399] opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="flex items-center gap-2 group-hover:text-[#f5f0e8] transition-colors">
                                    <feature.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
