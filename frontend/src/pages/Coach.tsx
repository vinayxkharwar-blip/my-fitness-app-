import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Calendar } from "lucide-react";

export default function Coach() {
    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in p-6">
            <h1 className="text-2xl font-bold font-heading mb-6">Your Coach</h1>

            <div className="bg-card rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center space-y-4 shadow-premium">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl mb-2">
                    🤖
                </div>
                <h2 className="text-xl font-bold text-white">AI Coach is Ready</h2>
                <p className="text-muted-foreground">
                    Your personalized AI fitness coach is analyzing your data. Start a chat or schedule a session.
                </p>

                <div className="w-full grid gap-3 pt-4">
                    <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                        <MessageSquare size={18} /> Chat with Coach
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 gap-2">
                        <Video size={18} /> Video Session
                    </Button>
                </div>
            </div>
        </div>
    );
}
