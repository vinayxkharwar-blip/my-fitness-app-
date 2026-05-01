import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/utils";
import { chatWithCoach } from "@/services/api";
import { chatService } from "@/services/chatService";
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

        // Persist user message to DB (fire-and-forget)
        chatService.sendMessage({ role: "user", content: text }).catch(() => {});

        try {
            // Call the real Gemini AI backend
            const aiResponse = await chatWithCoach(text);

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponse.reply || "I'm having trouble responding right now. Please try again.",
                sender: "ai",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMsg]);

            // Persist AI response to DB (fire-and-forget)
            chatService.sendMessage({ role: "assistant", content: newAiMsg.text }).catch(() => {});

        } catch (error) {
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
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0A0A0A] text-white font-sans shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-10">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-zinc-800 shrink-0 bg-[#0A0A0A]">
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
            <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 w-full">
                <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
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
                                    "px-5 py-4 rounded-3xl text-[15px] leading-relaxed relative shadow-lg transition-all duration-300",
                                    msg.sender === "user"
                                        ? "bg-[#22C55E] text-[#0A0A0A] font-medium rounded-br-sm"
                                        : "bg-[#1C1C1C] text-zinc-200 border border-zinc-800 rounded-bl-sm"
                                )}
                            >
                                <p className="mb-2">{msg.text}</p>
                                <span
                                    className={cn(
                                        "text-[10px] opacity-60 font-medium block mt-1",
                                        msg.sender === "user" ? "text-right" : "text-right text-zinc-400"
                                    )}
                                >
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex max-w-[85%] mr-auto justify-start animate-fade-in-up">
                        <div className="bg-[#1C1C1C] border border-zinc-800 px-5 py-4 rounded-3xl rounded-bl-sm flex items-center gap-1.5 h-[52px] shadow-lg">
                                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            {/* Input Area */}
            <div className="border-t border-zinc-800 shrink-0 p-4 bg-[#0A0A0A] w-full">
                <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
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
                            className="w-full bg-[#1C1C1C] border border-zinc-800 rounded-2xl py-3.5 pl-5 pr-14 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/50 resize-none overflow-hidden min-h-[52px] max-h-[120px]"
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
