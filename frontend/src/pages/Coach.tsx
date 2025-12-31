import { Button } from "@/components/ui/button";
import { Video, ArrowLeft, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

export default function Coach() {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userRole, setUserRole] = useState<'user' | 'trainer'>('user');

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUserRole(parsed.role || 'user');
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
    }, []);

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm your AI fitness coach. How can I help you today?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isChatOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");

        // Call Backend AI
        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: inputValue })
            });

            const data = await response.json();

            if (!response.ok) throw new Error("Failed to get response");

            const newAiMessage: Message = {
                id: Date.now() + 1,
                text: data.text || "Sorry, I'm having trouble thinking right now.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, newAiMessage]);

        } catch (error) {
            console.error("Chat error:", error);
            // Fallback error message (optional)
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting to the server. Please try again later.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const startChatWithGoal = (goal: string) => {
        setInputValue(`I need help to ${goal}`);
        setIsChatOpen(true);
    };

    if (isChatOpen) {
        return (
            <div className="fixed inset-0 z-[60] flex flex-col bg-[#F7F9FC] text-[#1F2937] animate-fade-in font-sans">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="-ml-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="h-6 w-6 text-gray-700" />
                    </Button>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl shadow-inner">
                        🤖
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 leading-tight">AI Coach</h2>
                        <p className="text-xs text-green-600 flex items-center font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span> Online • Instant
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 bg-gradient-to-b from-[#F7F9FC] to-white">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full animate-in slide-in-from-bottom-2 duration-300",
                                msg.sender === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                                    msg.sender === 'user'
                                        ? "bg-orange-400 text-white rounded-br-sm"
                                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                                )}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 pb-8">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="flex space-x-2 items-end"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask your coach anything..."
                            className="flex-1 bg-gray-50 text-gray-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-gray-400 font-medium"
                        />
                        <Button type="submit" size="icon" className="rounded-2xl h-14 w-14 shrink-0 bg-orange-400 hover:bg-orange-500 shadow-lg shadow-orange-400/20 transition-all border-none">
                            <Send className="h-6 w-6 text-white" />
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#F7F9FC] via-white to-white pb-32 text-[#1F2937] animate-fade-in px-6 pt-8 font-sans">

            {/* Header */}
            <header className="mb-8 space-y-2">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    How would you like to<br />
                    <span className="text-orange-500">train today?</span>
                </h1>
                <p className="text-gray-500 font-medium text-sm">
                    Choose instant AI guidance or a live human trainer
                </p>
            </header>

            <div className="space-y-6 max-w-md mx-auto">

                {/* Primary Card: AI Coach */}
                <div
                    onClick={() => setIsChatOpen(true)}
                    className="relative group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-[2.5rem] p-6 border border-orange-100/50 shadow-xl shadow-orange-900/5 overflow-hidden transition-transform group-hover:scale-[1.01]">

                        {/* Subtle Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50 to-pink-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none"></div>

                        <div className="flex items-start justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                                <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] flex items-center justify-center text-4xl shadow-sm border-4 border-white">
                                    🤖
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                                    ONLINE
                                </div>
                            </div>
                            <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Recommended
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">AI Fitness Coach</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Instant workouts, dietary advice, and habit coaching tailored just for you.
                            </p>
                        </div>

                        <Button className="w-full h-14 rounded-2xl bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg shadow-lg shadow-orange-400/25 border-none transition-all group-hover:shadow-xl">
                            Start AI Coaching <span className="ml-2 text-orange-100 text-sm font-normal">• Free & Instant</span>
                        </Button>
                    </div>
                </div>

                {/* Secondary Card: Video Session */}
                <div
                    onClick={() => {
                        if (userRole === 'trainer') {
                            alert("Starting Video Session Host Mode...");
                            window.open("https://meet.google.com/new", "_blank");
                        } else {
                            navigate('/trainers');
                        }
                    }}
                    className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Video size={28} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Live Trainer Session</h3>
                            <p className="text-xs text-gray-500 font-medium">30–45 min • 1-on-1 Video</p>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                        Connect with certified human trainers for personalized video coaching sessions.
                    </p>

                    <Button variant="outline" className="w-full h-12 rounded-xl border-2 border-gray-100 bg-transparent text-gray-900 font-bold hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all">
                        Find a Trainer
                    </Button>
                </div>

                {/* Quick Goal Chips */}
                <div className="pt-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                        Quick Actions
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => startChatWithGoal("lose fat")} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-100 transition-all text-left group">
                            <span className="text-xl group-hover:scale-110 transition-transform">🔥</span>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-orange-500">Lose Fat</span>
                        </button>
                        <button onClick={() => startChatWithGoal("gain muscle")} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-100 transition-all text-left group">
                            <span className="text-xl group-hover:scale-110 transition-transform">💪</span>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-orange-500">Gain Muscle</span>
                        </button>
                        <button onClick={() => startChatWithGoal("plan my meals")} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-100 transition-all text-left group">
                            <span className="text-xl group-hover:scale-110 transition-transform">🥗</span>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-orange-500">Meal Plan</span>
                        </button>
                        <button onClick={() => startChatWithGoal("sleep better")} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-100 transition-all text-left group">
                            <span className="text-xl group-hover:scale-110 transition-transform">😴</span>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-orange-500">Better Sleep</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

