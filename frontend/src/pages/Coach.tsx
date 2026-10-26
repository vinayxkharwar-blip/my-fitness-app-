import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/utils";
import { chatWithCoach } from "@/services/api";
import { toast } from "sonner";

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

    const handleSend = async (text: string) => {
        if (!text.trim() || isTyping) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Call the real OpenAI backend (automatically persists both user query and AI reply to DB)
            const aiResponse = await chatWithCoach(text);

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponse.reply || "I'm having trouble responding right now. Please try again.",
                sender: "ai",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMsg]);
        } catch {
            toast.error("Failed to get AI response. Please try again.");
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having connection issues right now. Please try again in a moment.",
                sender: "ai",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F3F6F8] text-[#0F172A] font-sans relative z-10">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-[#E2E8F0] shrink-0 bg-white shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#64748B] transition-all md:hidden"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center relative">
                            <Bot className="w-5 h-5 text-[#16A34A]" />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#16A34A] rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-[#0F172A]">
                                AI Coach <Sparkles className="w-4 h-4 text-[#16A34A]" />
                            </h1>
                            <p className="text-xs text-[#16A34A] font-semibold">Active & Ready</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col gap-4 w-full bg-[#F3F6F8]">
                <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
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
                                    "px-5 py-4 rounded-3xl text-[15px] leading-relaxed relative shadow-sm transition-all duration-300",
                                    msg.sender === "user"
                                        ? "bg-[#16A34A] text-white font-medium rounded-br-sm shadow-[#16A34A]/20"
                                        : "bg-white text-[#0F172A] border border-[#E2E8F0] rounded-bl-sm"
                                )}
                            >
                                <p className="mb-2 whitespace-pre-wrap">{msg.text}</p>
                                <span
                                    className={cn(
                                        "text-[10px] font-medium block mt-1",
                                        msg.sender === "user" ? "text-right text-white/80" : "text-right text-[#94A3B8]"
                                    )}
                                >
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex max-w-[85%] mr-auto justify-start animate-fade-in-up">
                            <div className="bg-white border border-[#E2E8F0] px-5 py-4 rounded-3xl rounded-bl-sm flex items-center gap-1.5 h-[52px] shadow-sm">
                                <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            {/* Input Area */}
            <div className="border-t border-[#E2E8F0] shrink-0 p-4 bg-white w-full shadow-sm">
                <div className="max-w-4xl mx-auto flex flex-col gap-3 w-full">
                    {/* Suggestions */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {SUGGESTIONS.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(suggestion)}
                                className="whitespace-nowrap px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all"
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
                            placeholder="Ask your coach anything about nutrition, workouts, recovery..."
                            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl py-3.5 pl-5 pr-14 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 resize-none overflow-hidden min-h-[52px] max-h-[120px]"
                            rows={1}
                        />
                        <button
                            onClick={() => handleSend(inputValue)}
                            disabled={!inputValue.trim()}
                            className="absolute right-2 bottom-1.5 w-10 h-10 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center disabled:opacity-40 disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
