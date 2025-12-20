import { Button } from "@/components/ui/button";
import { MessageSquare, Video, ArrowLeft, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

export default function Coach() {
    const [isChatOpen, setIsChatOpen] = useState(false);
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

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");

        // Mock AI Response
        setTimeout(() => {
            const lowerInput = inputValue.toLowerCase();
            let aiText = "";

            if (lowerInput.includes("diet") || lowerInput.includes("meal") || lowerInput.includes("food")) {
                aiText = "Here is a simple balanced diet plan for you:\n\n• Breakfast: Oatmeal with berries & nuts\n• Lunch: Grilled chicken breast with quinoa & veggies\n• Snack: Greek yogurt or a piece of fruit\n• Dinner: Baked salmon with sweet potato & asparagus\n\nRemember to drink plenty of water!";
            } else {
                const aiResponses = [
                    "That's a great goal! Let's work on that.",
                    "Make sure to stay hydrated today.",
                    "Consistency is key. You're doing great!",
                    "Try increasing your protein intake for better recovery.",
                    "How did your last workout feel?",
                    "Don't forget to stretch after your exercises."
                ];
                aiText = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            }

            const newAiMessage: Message = {
                id: Date.now() + 1,
                text: aiText,
                sender: 'ai'
            };
            setMessages(prev => [...prev, newAiMessage]);
        }, 1000);
    };

    if (isChatOpen) {
        return (
            <div className="fixed inset-0 z-[60] flex flex-col bg-background text-foreground animate-fade-in">
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center space-x-3 bg-card shadow-sm z-10">
                    <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="-ml-2">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                        🤖
                    </div>
                    <div>
                        <h2 className="font-bold">AI Coach</h2>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full",
                                msg.sender === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                                    msg.sender === 'user'
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted text-foreground rounded-bl-none"
                                )}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-background border-t border-border">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="flex space-x-2"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask your coach anything..."
                            className="flex-1 bg-muted text-foreground rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <Button type="submit" size="icon" className="rounded-full h-12 w-12 shrink-0 bg-primary hover:bg-primary/90">
                            <Send className="h-5 w-5 text-white" />
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in p-6">
            <h1 className="text-2xl font-bold font-heading mb-6">Your Coach</h1>

            <div className="bg-card rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center space-y-4 shadow-premium text-card-foreground">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl mb-2">
                    🤖
                </div>
                <h2 className="text-xl font-bold text-foreground">AI Coach is Ready</h2>
                <p className="text-muted-foreground">
                    Your personalized AI fitness coach is analyzing your data. Start a chat or schedule a session.
                </p>

                <div className="w-full grid gap-3 pt-4">
                    <Button
                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                        onClick={() => setIsChatOpen(true)}
                    >
                        <MessageSquare size={18} /> Chat with Coach
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 gap-2 text-slate-700">
                        <Video size={18} /> Video Session
                    </Button>
                </div>
            </div>
        </div>
    );
}
