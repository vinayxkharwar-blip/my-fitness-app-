import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Video, MessageSquare } from "lucide-react";

interface Trainer {
    id: number;
    name: string;
    specialty: string;
    category: string;
    rating: number;
    sessions: number;
    image: string;
    available: boolean;
}

const MOCK_TRAINERS: Trainer[] = [
    {
        id: 1,
        name: "Mike Chen",
        specialty: "Strength Training",
        category: "Strength",
        rating: 4.8,
        sessions: 189,
        image: "https://i.pravatar.cc/300?img=12",
        available: true
    },
    {
        id: 2,
        name: "Emily Rodriguez",
        specialty: "Yoga & Flexibility",
        category: "Yoga",
        rating: 5.0,
        sessions: 312,
        image: "https://i.pravatar.cc/300?img=5",
        available: false
    },
    {
        id: 3,
        name: "David Kim",
        specialty: "HIIT & CrossFit",
        category: "HIIT",
        rating: 4.7,
        sessions: 156,
        image: "https://i.pravatar.cc/300?img=7",
        available: true
    },
    {
        id: 4,
        name: "Aisha Patel",
        specialty: "Cardio & Endurance",
        category: "Cardio",
        rating: 4.9,
        sessions: 241,
        image: "https://i.pravatar.cc/300?img=9",
        available: true
    }
];

const CATEGORIES = ["All", "Strength", "Yoga", "HIIT", "Cardio"];

const Trainers: React.FC = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredTrainers = activeCategory === "All"
        ? MOCK_TRAINERS
        : MOCK_TRAINERS.filter(t => t.category === activeCategory);

    return (
        <div className="min-h-full w-full bg-[#0b0f1a] text-[#f5f0e8] relative font-sans selection:bg-[#34d399]/30 scrollbar-hide pb-20 md:pb-6">

            {/* Inject Font and Animation */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sora:wght@100..800&display=swap');
                    @keyframes pulse-dot {
                        0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.7); }
                        70% { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
                        100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
                    }
                `}
            </style>

            {/* Top Navigation */}
            <div className="flex items-center px-6 pt-12 pb-4 gap-4 sticky top-0 z-20 bg-[#0b0f1a]/95 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 shrink-0 rounded-full bg-[#141927] flex items-center justify-center border border-white/5 shadow-md active:scale-95 transition-transform"
                >
                    <ChevronLeft className="w-5 h-5 text-[#f5f0e8]" />
                </button>
                <h1 className="text-[1.6rem] font-bold text-[#f5f0e8] tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Expert Trainers
                </h1>
            </div>

            {/* Filter Chips (Horizontal Scroll) */}
            <div className="px-6 py-2 overflow-x-auto scrollbar-hide flex gap-3 mb-4">
                {CATEGORIES.map(category => {
                    const isActive = activeCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-all shrink-0 border ${isActive
                                ? 'bg-[#34d399]/10 border-[#34d399]/30 text-[#34d399]'
                                : 'bg-[#141927] border-white/5 text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            {/* Main Content List */}
            <div className="px-6 space-y-4 relative z-10 pb-8">
                {filteredTrainers.map((trainer) => (
                    <div
                        key={trainer.id}
                        className="bg-[#141927] rounded-[20px] p-[18px] border border-[rgba(255,255,255,0.07)] shadow-lg"
                    >
                        {/* Top Row: Avatar & Info */}
                        <div className="flex gap-4 mb-5">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    className="w-[60px] h-[60px] rounded-[16px] object-cover bg-zinc-800"
                                />
                                {/* Online Status Dot */}
                                {trainer.available && (
                                    <div
                                        className="absolute -top-1 -right-1 w-[12px] h-[12px] rounded-full bg-[#34d399] border-2 border-[#0b0f1a]"
                                        style={{
                                            boxShadow: '0 0 8px rgba(52,211,153,0.6)',
                                            animation: 'pulse-dot 2s infinite'
                                        }}
                                    />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="text-[1.05rem] font-bold text-[#f5f0e8] truncate pr-4">
                                    {trainer.name}
                                </h3>
                                <p className="text-[0.8rem] text-zinc-400 mb-1.5 truncate">
                                    {trainer.specialty}
                                </p>

                                {/* Meta Row */}
                                <div className="flex items-center gap-3 text-[0.7rem] font-medium">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-[12px] h-[12px] text-[#fbbf24] fill-[#fbbf24]" />
                                        <span className="text-[#f5f0e8]">{trainer.rating}</span>
                                    </div>
                                    <div className="w-[3px] h-[3px] rounded-full bg-zinc-600" />
                                    <span className="text-zinc-400">{trainer.sessions} sessions</span>

                                    <div className="flex-1 flex justify-end">
                                        {trainer.available ? (
                                            <span className="px-2 py-[2px] rounded bg-[#34d399]/10 border border-[#34d399]/20 text-[#34d399]">Available</span>
                                        ) : (
                                            <span className="px-2 py-[2px] rounded bg-[#ef4444]/10 text-[#f87171]">Busy</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Action Buttons */}
                        <div className="flex gap-3">
                            {/* Book Session Button */}
                            <button
                                onClick={() => trainer.available ? alert(`📹 Video session request sent to ${trainer.name}!\n\nYou'll receive a confirmation shortly.`) : null}
                                disabled={!trainer.available}
                                className={`flex-1 h-[42px] rounded-[14px] flex items-center justify-center gap-2 text-sm font-bold transition-all ${trainer.available
                                    ? 'text-[#064e3b] active:scale-[0.98]'
                                    : 'bg-[#1a2035] text-[#6b7a99] cursor-not-allowed opacity-80'
                                    }`}
                                style={trainer.available ? {
                                    background: 'linear-gradient(135deg, #34d399, #059669)',
                                    boxShadow: '0 0 20px rgba(52,211,153,0.25)'
                                } : {}}
                            >
                                <Video size={16} className={trainer.available ? "text-[#064e3b]" : "text-[#505d76]"} />
                                Book Session
                            </button>

                            {/* Chat Button */}
                            <button
                                onClick={() => navigate("/coach")}
                                className="w-[64px] shrink-0 h-[42px] rounded-[14px] flex items-center justify-center bg-[#1a2035] border border-white/[0.07] active:scale-[0.95] transition-transform hover:bg-[#1e253e]"
                            >
                                <MessageSquare size={18} className="text-[#f5f0e8]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Trainers;
