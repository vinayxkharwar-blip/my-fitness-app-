import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Video, MessageSquare } from "lucide-react";

interface Trainer {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    sessions: number;
    image: string;
    available: boolean;
}

const MOCK_TRAINERS: Trainer[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Weight Loss & Cardio",
        rating: 4.9,
        sessions: 234,
        image: "https://i.pravatar.cc/300?img=1",
        available: true
    },
    {
        id: 2,
        name: "Mike Chen",
        specialty: "Strength Training",
        rating: 4.8,
        sessions: 189,
        image: "https://i.pravatar.cc/300?img=12",
        available: true
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        specialty: "Yoga & Flexibility",
        rating: 5.0,
        sessions: 312,
        image: "https://i.pravatar.cc/300?img=5",
        available: false
    },
    {
        id: 4,
        name: "David Kim",
        specialty: "HIIT & CrossFit",
        rating: 4.7,
        sessions: 156,
        image: "https://i.pravatar.cc/300?img=7",
        available: true
    },
    {
        id: 5,
        name: "Lisa Anderson",
        specialty: "Nutrition & Wellness",
        rating: 4.9,
        sessions: 278,
        image: "https://i.pravatar.cc/300?img=9",
        available: true
    },
    {
        id: 6,
        name: "James Wilson",
        specialty: "Athletic Performance",
        rating: 4.8,
        sessions: 201,
        image: "https://i.pravatar.cc/300?img=13",
        available: false
    },
];

const Trainers: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-32">

            {/* Header */}
            <header className="px-6 pt-8 pb-6 sticky top-0 z-20 bg-[#E9EEF3]">
                <div className="flex items-center gap-4 mb-1">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Expert Trainers
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 space-y-4">
                {MOCK_TRAINERS.map((trainer) => (
                    <div
                        key={trainer.id}
                        className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
                    >
                        <div className="flex gap-4 mb-4">
                            <div className="relative shrink-0">
                                <img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />
                                {trainer.available && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
                                    {trainer.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {trainer.specialty}
                                </p>

                                <div className="flex items-center gap-3 text-xs">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span className="font-semibold text-gray-900">{trainer.rating}</span>
                                    </div>
                                    <span className="text-gray-500">{trainer.sessions} sessions</span>
                                    {trainer.available ? (
                                        <span className="text-green-600 font-semibold">Available</span>
                                    ) : (
                                        <span className="text-gray-400">Busy</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                onClick={() => alert(`📹 Video session request sent to ${trainer.name}!\n\nYou'll receive a confirmation shortly.`)}
                                disabled={!trainer.available}
                                className={`h-11 rounded-full text-sm font-semibold gap-2 transition-colors ${trainer.available
                                        ? 'bg-[#FFA07A] hover:bg-[#FF8C60] text-white'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    } border-none`}
                            >
                                <Video size={16} /> Book Session
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/coach")}
                                className="h-11 rounded-full text-sm font-semibold gap-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            >
                                <MessageSquare size={16} /> Chat
                            </Button>
                        </div>
                    </div>
                ))}

                <p className="text-xs text-gray-500 text-center pt-4">
                    All trainers are certified professionals with extensive experience.
                </p>
            </main>
        </div>
    );
};

export default Trainers;
