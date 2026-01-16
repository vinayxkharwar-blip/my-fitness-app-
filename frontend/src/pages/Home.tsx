import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { Flame, Droplets, Trophy, ArrowRight, Plus, Sparkles, Dumbbell } from "lucide-react";

// Mock Data (Stats for now)
const DAILY_STATS = {
    calories: { current: 1250, target: 2200 },
    protein: { current: 95, target: 160 },
    carbs: { current: 140, target: 200 },
    fat: { current: 45, target: 70 },
    water: { current: 1200, target: 2500 }, // ml
};

export default function Home() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("Alex");
    const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=5");
    const [waterIntake, setWaterIntake] = useState(DAILY_STATS.water.current);

    const addWater = () => {
        setWaterIntake(prev => Math.min(prev + 200, DAILY_STATS.water.target));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    // Set initial name from local storage if available
                    if (user.full_name) {
                        setUserName(user.full_name.split(" ")[0]); // First name only
                    }

                    const userId = user.id || user.user_id;
                    if (userId) {
                        const response = await fetch(`http://localhost:5000/profile/${userId}`);
                        if (response.ok) {
                            const data = await response.json();
                            if (data.full_name) {
                                setUserName(data.full_name.split(" ")[0]);
                            }
                            if (data.profile_image) {
                                setProfileImage(data.profile_image);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch user data for Home", err);
            }
        };
        fetchUserData();
    }, []);

    // Calculate percentage for the ring
    const caloriesProgress = Math.min((DAILY_STATS.calories.current / DAILY_STATS.calories.target) * 100, 100);

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-32 text-[#1F2937] font-sans selection:bg-[#9ED9E6]/30">

            {/* HEADER SECTION */}
            <header className="px-6 pt-12 pb-6 flex justify-between items-end bg-[#E9EEF3]/90 backdrop-blur-md sticky top-0 z-20">
                <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                    <h1 className="text-3xl font-extrabold font-heading tracking-tight text-[#1F2937]">
                        Hello, <span className="text-[#FFA07A]">{userName}</span>
                    </h1>
                </div>
                <Link to="/profile" className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/5 cursor-pointer hover:scale-105 transition-transform overflow-hidden border border-white">
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                </Link>
            </header>

            <main className="px-6 flex flex-col gap-6">

                {/* HERO CARD: Calories Ring */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 mb-2 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Soft Glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#9ED9E6]/20 rounded-full blur-[60px] pointer-events-none"></div>

                    {/* Circular Progress (Light Theme) */}
                    <div className="relative w-52 h-52 mb-6 flex items-center justify-center">
                        {/* Background Circle */}
                        <div className="absolute inset-0 rounded-full border-[14px] border-gray-100"></div>
                        {/* Active Progress Circle */}
                        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                            <circle
                                cx="104" cy="104" r="91"
                                fill="none" stroke="currentColor" strokeWidth="14"
                                strokeDasharray="571" strokeDashoffset={571 - (571 * caloriesProgress) / 100}
                                strokeLinecap="round"
                                className="text-[#FFA07A] transition-all duration-1000 ease-out"
                            />
                        </svg>

                        <div className="text-center z-10 flex flex-col items-center">
                            <Flame className="h-6 w-6 text-[#FFA07A] mb-1" fill="currentColor" />
                            <h3 className="text-5xl font-extrabold text-[#1F2937] tracking-tight">
                                {DAILY_STATS.calories.target - DAILY_STATS.calories.current}
                            </h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Kcal Left</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#F7FAFC] px-6 py-3 rounded-full">
                        <span className="text-sm font-bold text-gray-500">Goal: <span className="text-[#1F2937]">{DAILY_STATS.calories.target.toLocaleString()}</span></span>
                    </div>
                </div>

                {/* MACROS - Clean Horizontal Bars */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                    <h3 className="text-lg font-bold text-[#1F2937] mb-6">Today's Nutrition</h3>

                    <div className="space-y-6">
                        {/* Protein - Coral */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-gray-400">Protein</span>
                                <span className="text-[#1F2937]">{DAILY_STATS.protein.current}g <span className="text-gray-300 font-normal">/ {DAILY_STATS.protein.target}g</span></span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#FFA07A] w-[60%] rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        {/* Carbs - Sky Blue */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-gray-400">Carbs</span>
                                <span className="text-[#1F2937]">{DAILY_STATS.carbs.current}g <span className="text-gray-300 font-normal">/ {DAILY_STATS.carbs.target}g</span></span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#9ED9E6] w-[70%] rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        {/* Fat - Mint */}
                        <div className="group">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-gray-400">Fat</span>
                                <span className="text-[#1F2937]">{DAILY_STATS.fat.current}g <span className="text-gray-300 font-normal">/ {DAILY_STATS.fat.target}g</span></span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#BFE8C7] w-[45%] rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HYDRATION ROW */}
                <div className="bg-white rounded-[2rem] p-5 shadow-xl shadow-blue-900/5 flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#E0F2FE] h-12 w-12 flex items-center justify-center rounded-2xl text-[#9ED9E6]">
                            <Droplets size={22} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-base font-bold text-[#1F2937]">Hydration</div>
                            <div className="text-xs text-gray-400 font-medium">{waterIntake} / {DAILY_STATS.water.target} ml</div>
                        </div>
                    </div>

                    <Button
                        size="icon"
                        onClick={addWater}
                        className="h-14 w-14 rounded-full bg-[#9ED9E6] text-white hover:bg-[#7EC4D4] shadow-lg shadow-[#9ED9E6]/40 border-none transition-all hover:scale-110 active:scale-95"
                    >
                        <Plus size={26} strokeWidth={3} />
                    </Button>
                </div>

                {/* AI SUGGESTION CARD */}
                <div className="bg-[#F0F9FF] rounded-[2rem] p-6 border border-[#E0F2FE] shadow-sm animate-slide-up w-full relative overflow-hidden">
                    <div className="flex gap-4 items-start relative z-10">
                        <div className="mt-1 bg-white p-2.5 rounded-xl shadow-sm">
                            <Sparkles size={20} className="text-[#9ED9E6]" fill="#9ED9E6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#1F2937] mb-2">Coach Insight</h4>
                            <p className="text-sm text-[#5FB3B3] leading-relaxed">
                                You've been crushing your cardio! 🏃‍♂️ I've slightly increased your
                                <span className="text-[#1F2937] font-bold"> Protein</span> target by 10g.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
