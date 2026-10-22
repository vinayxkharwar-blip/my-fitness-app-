import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Video, MessageSquare } from "lucide-react";
import { toast } from "sonner";

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
        specialty: "Strength Training & Hypertrophy",
        category: "Strength",
        rating: 4.8,
        sessions: 189,
        image: "https://i.pravatar.cc/300?img=12",
        available: true
    },
    {
        id: 2,
        name: "Emily Rodriguez",
        specialty: "Vinyasa Yoga & Mobility",
        category: "Yoga",
        rating: 5.0,
        sessions: 312,
        image: "https://i.pravatar.cc/300?img=5",
        available: false
    },
    {
        id: 3,
        name: "David Kim",
        specialty: "HIIT Conditioning & Functional",
        category: "HIIT",
        rating: 4.7,
        sessions: 156,
        image: "https://i.pravatar.cc/300?img=7",
        available: true
    },
    {
        id: 4,
        name: "Aisha Patel",
        specialty: "Cardio & Endurance Coaching",
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
        <div className="min-h-screen w-full bg-[#F3F6F8] text-[#0F172A] font-sans pb-24 md:pb-12">
            
            {/* Top Navigation */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-all active:scale-95 text-[#0F172A]"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#64748B]" />
                        </button>
                        <div>
                            <h1 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                                Expert Coaches & Trainers
                            </h1>
                            <p className="text-xs text-[#64748B] hidden sm:block">
                                Book 1-on-1 virtual sessions with certified elite wellness professionals
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-4 mb-2">
                    {CATEGORIES.map(category => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 border ${
                                    isActive
                                        ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-sm'
                                        : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Trainers Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTrainers.map((trainer) => (
                        <div
                            key={trainer.id}
                            className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                            {/* Top Section: Avatar & Info */}
                            <div>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="relative shrink-0">
                                        <img
                                            src={trainer.image}
                                            alt={trainer.name}
                                            className="w-16 h-16 rounded-2xl object-cover bg-slate-100 border border-[#E2E8F0]"
                                        />
                                        {trainer.available && (
                                            <div
                                                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-white shadow-sm"
                                            />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-base font-bold text-[#0F172A] truncate">
                                                {trainer.name}
                                            </h3>
                                            {trainer.available ? (
                                                <span className="px-2.5 py-0.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[10px] font-bold">Available</span>
                                            ) : (
                                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[#64748B] text-[10px] font-medium">Booked</span>
                                            )}
                                        </div>

                                        <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                                            {trainer.specialty}
                                        </p>

                                        {/* Rating & Sessions */}
                                        <div className="flex items-center gap-3 mt-2 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                <span className="font-bold text-[#0F172A]">{trainer.rating}</span>
                                            </div>
                                            <span className="text-[#94A3B8]">•</span>
                                            <span className="text-[#64748B] font-medium">{trainer.sessions} sessions completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="flex gap-2.5 pt-4 border-t border-[#E2E8F0]">
                                <button
                                    onClick={() => {
                                        if (trainer.available) {
                                            toast.success(`Video session request sent to ${trainer.name}! Confirmation emailed.`);
                                        }
                                    }}
                                    disabled={!trainer.available}
                                    className={`flex-1 h-10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                                        trainer.available
                                            ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm active:scale-95'
                                            : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
                                    }`}
                                >
                                    <Video size={15} />
                                    <span>{trainer.available ? 'Book Session' : 'Unavailable'}</span>
                                </button>

                                <button
                                    onClick={() => navigate("/coach")}
                                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors text-[#0F172A]"
                                    title="AI Chat"
                                >
                                    <MessageSquare size={16} className="text-[#64748B]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Trainers;
