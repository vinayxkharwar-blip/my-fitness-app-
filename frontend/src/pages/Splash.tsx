
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Splash({ onFinish }: { onFinish: () => void }) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Start fade out after 2.5s
        const timer = setTimeout(() => {
            setOpacity(0);
        }, 2500);

        // Trigger onFinish after fade out completes (3s total)
        const finishTimer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1020] transition-opacity duration-1000 ease-in-out"
            style={{ opacity }}
        >
            <div className="flex flex-col items-center animate-pulse-gentle">
                <div className="relative mb-6">
                    <img
                        src="/logo.png"
                        alt="FitSnapAI Logo"
                        className="w-32 h-32 object-cover rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.3)]"
                    />

                    {/* Optional small decoration */}
                    <div className="absolute -top-2 -right-2 bg-[#1A1B3A] rounded-full p-2 shadow-lg border border-indigo-500/30">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold font-heading text-white tracking-tight mb-2">
                    FitSnapAI
                </h1>
                <p className="text-indigo-300 text-sm font-medium tracking-[0.2em] uppercase">
                    Your Personal Coach
                </p>
            </div>

            {/* Loading spinner at bottom */}
            <div className="absolute bottom-12">
                <div className="w-8 h-8 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
