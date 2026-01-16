import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Activity, Utensils, ScanFace } from "lucide-react";

export default function Index() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isSignedIn = !!user;

    const handleGetStarted = () => {
        if (isSignedIn) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] text-[#1F2937] font-sans selection:bg-[#FFA07A]/30 overflow-x-hidden">

            {/* Navigation */}
            <nav className="absolute top-0 w-full z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFA07A] to-[#FF8C60] flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-[#1F2937]">FitSnap</span>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="font-bold text-gray-600 hover:text-[#1F2937] hover:bg-white/50"
                >
                    Log In
                </Button>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 px-4 md:px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Text Content */}
                    <div className="space-y-6 relative z-10 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-white/50 animate-fade-in-up mx-auto lg:mx-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9ED9E6] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5FB3B3]"></span>
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 tracking-wide uppercase">AI-Powered Wellness</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#1F2937] animate-fade-in-up delay-100">
                            Balance Body <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA07A] to-[#FF8C60]">
                                & Mind.
                            </span>
                        </h1>

                        <p className="text-base lg:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
                            Your personal AI health companion. Scan meals, track progress, and find your rhythm with a coach that understands you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4 animate-fade-in-up delay-300 w-full px-4 sm:px-0">
                            <Button
                                onClick={handleGetStarted}
                                className="h-14 sm:h-12 w-full sm:w-auto rounded-full bg-[#1F2937] hover:bg-black text-white text-lg sm:text-base font-bold shadow-xl shadow-blue-900/10 transition-all active:scale-95"
                            >
                                Start Your Journey
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login")}
                                className="h-14 sm:h-12 w-full sm:w-auto rounded-full border-gray-200 bg-white text-gray-600 font-bold hover:bg-gray-50 text-lg sm:text-base transition-all active:bg-gray-100"
                            >
                                Member Login
                            </Button>
                        </div>
                    </div>

                    {/* Hero Visual/Abstract */}
                    <div className="relative h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center animate-fade-in delay-500 scale-90 sm:scale-100">
                        {/* Abstract Blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#9ED9E6]/20 rounded-full blur-[60px] sm:blur-[80px]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] bg-[#FFA07A]/20 rounded-full blur-[40px] sm:blur-[60px] translate-x-10 sm:translate-x-16 -translate-y-10 sm:-translate-y-16"></div>

                        {/* Floating Cards Mockup */}
                        <div className="relative z-10 w-full max-w-[280px] sm:max-w-sm space-y-3 perspective-1000">
                            <div className="bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl shadow-blue-900/10 border border-white transform rotate-[-6deg] translate-y-6 hover:translate-y-4 transition-transform duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[#FFA07A]"><Utensils size={18} /></div>
                                    <div>
                                        <p className="font-bold text-[#1F2937] text-sm">Avocado Toast</p>
                                        <p className="text-xs text-gray-500">320 kcal • Balanced</p>
                                    </div>
                                    <div className="ml-auto font-bold text-[#9ED9E6] text-sm">A+</div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-2xl shadow-blue-900/15 border border-white transform rotate-[2deg] hover:rotate-0 transition-transform duration-500 relative z-20">
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Daily Goal</p>
                                        <p className="text-2xl font-extrabold text-[#1F2937]">84%</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#9ED9E6] animate-pulse">
                                        <Activity size={18} />
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#FFA07A] to-[#FF8C60] w-[84%] rounded-full"></div>
                                </div>
                            </div>

                            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl shadow-blue-900/5 border border-white transform rotate-[5deg] -translate-y-3 hover:-translate-y-1 transition-transform duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#4ADE80]"><ScanFace size={18} /></div>
                                    <div>
                                        <p className="font-bold text-[#1F2937] text-sm">Body Analysis</p>
                                        <p className="text-xs text-gray-500">Posture Improved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Preview */}
            <section className="py-8 sm:py-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto pl-6 pr-0 md:px-6">
                    {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mr-6 pr-6 md:grid md:grid-cols-3 md:gap-6 md:pb-0 md:mr-0 md:pr-0 scrollbar-hide">
                        {[
                            { icon: ScanFace, title: "Body Analysis", desc: "Instant AI assessment of your physique and posture." },
                            { icon: Utensils, title: "Meal Scanning", desc: "Snap a photo to track calories and macros automatically." },
                            { icon: Activity, title: "Health Tracking", desc: "Monitor sleep, hydration, and steps in one peaceful place." }
                        ].map((feature, i) => (
                            <div key={i} className="min-w-[85%] sm:min-w-0 snap-center p-6 rounded-[2rem] bg-[#F8FAFC] hover:bg-[#F0F9FF] transition-colors duration-300 group border border-transparent hover:border-[#E0F2FE]">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#1F2937]">
                                    <feature.icon size={22} />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-[#1F2937]">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-8 text-center text-sm text-gray-400 bg-[#E9EEF3]">
                <p>&copy; {new Date().getFullYear()} FitSnap Wellness. All rights reserved.</p>
            </footer>

        </div>
    );
}
