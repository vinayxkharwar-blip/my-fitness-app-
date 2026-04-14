import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/utils";

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
}

const SUGGESTIONS = [
    "What should I eat for recovery?",
    "Give me a 15-min HIIT workout",
    "Why am I always tired?",
    "How to improve my sleep?"
];

export default function Coach() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hey! I'm your FitSnap AI Coach. How can I help you crush your goals today?",
            sender: "ai",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "That's a great question! Based on your recent activity, I'd recommend focusing on protein intake post-workout and ensuring you get at least 7 hours of sleep.",
                sender: "ai",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5s delay
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen w-full bg-[#0A0A0A] text-white font-sans relative">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-20 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-zinc-800 text-white transition-all md:hidden"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center shadow-glow-purple border border-[#22C55E]/20 relative">
                            <Bot className="w-5 h-5 text-[#22C55E]" />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#0A0A0A]"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold font-heading tracking-tight flex items-center gap-2">
                                AI Coach <Sparkles className="w-4 h-4 text-[#22C55E]" />
                            </h1>
                            <p className="text-xs text-[#22C55E] font-medium">Online</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 w-full max-w-3xl mx-auto scrollbar-hide pb-32 md:pb-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex max-w-[85%] animate-fade-in-up",
                            msg.sender === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "p-4 rounded-[1.5rem] text-[15px] leading-relaxed relative",
                                msg.sender === "user"
                                    ? "bg-[#22C55E] text-[#0A0A0A] font-medium rounded-br-sm shadow-premium"
                                    : "bg-[#1C1C1C] text-zinc-200 border border-zinc-800 rounded-bl-sm"
                            )}
                        >
                            <p className="mb-2">{msg.text}</p>
                            <span
                                className={cn(
                                    "text-[10px] absolute bottom-1.5 opacity-60 font-medium",
                                    msg.sender === "user" ? "right-4" : "right-4"
                                )}
                            >
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex max-w-[85%] mr-auto justify-start animate-fade-in-up">
                        <div className="bg-[#1C1C1C] border border-zinc-800 p-4 rounded-[1.5rem] rounded-bl-sm flex items-center gap-1.5 h-[52px]">
                            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
            </main>

            {/* Input Area */}
            <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-64 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-zinc-800 shrink-0 pb-safe z-30">
                <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col gap-3">

                    {/* Suggestions */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {SUGGESTIONS.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(suggestion)}
                                className="whitespace-nowrap px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <div className="flex items-end gap-2 relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(inputValue);
                                }
                            }}
                            placeholder="Ask your coach anything..."
                            className="w-full bg-[#1C1C1C] border border-zinc-800 rounded-3xl py-3.5 pl-5 pr-14 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 resize-none overflow-hidden min-h-[52px] max-h-[120px]"
                            rows={1}
                        />
                        <button
                            onClick={() => handleSend(inputValue)}
                            disabled={!inputValue.trim()}
                            className="absolute right-2 bottom-1.5 w-10 h-10 rounded-full bg-[#22C55E] text-[#0A0A0A] flex items-center justify-center disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all hover:scale-105 active:scale-95 shadow-premium disabled:shadow-none"
                        >
                            <Send className="w-5 h-5 ml-0.5" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
