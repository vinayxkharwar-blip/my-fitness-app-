import { Button } from "@/components/ui/button";
import { MessageSquare, Video } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Coach() {
    const navigate = useNavigate();

    useEffect(() => {
        // Coach page ko history me lock karo
        window.history.pushState(null, "", window.location.href);

        const handleBack = () => {
            navigate("/home", { replace: true }); // ✅ direct HOME
        };

        window.addEventListener("popstate", handleBack);

        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in p-6">
            <h1 className="text-2xl font-bold font-heading mb-6">Your Coach</h1>

            <div className="bg-card rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center space-y-4 shadow-premium">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl mb-2">
                    🤖
                </div>

                <h2 className="text-xl font-bold text-white">AI Coach is Ready</h2>

                <p className="text-muted-foreground">
                    Your personalized AI fitness coach is analyzing your data.
                </p>

                <div className="w-full grid gap-3 pt-4">
                    <Button className="w-full h-12 rounded-xl bg-primary">
                        <MessageSquare size={18} /> Chat with Coach
                    </Button>

                    <Button variant="outline" className="w-full h-12 rounded-xl">
                        <Video size={18} /> Video Session
                    </Button>
                </div>
            </div>
        </div>
    );
}
