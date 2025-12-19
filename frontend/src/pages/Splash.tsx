
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 transition-opacity duration-1000 ease-in-out"
            style={{ opacity }}
        >
            <div className="flex flex-col items-center animate-pulse-gentle">
                <div className="relative mb-6">
                    <img src="/logo.png" alt="FitLife Logo" className="w-24 h-24 object-contain drop-shadow-md" />

                    {/* Optional small decoration */}
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-slate-100">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold font-heading text-slate-800 tracking-tight">
                    FitLife
                </h1>
                <p className="text-slate-500 text-sm font-medium mt-2 tracking-widest uppercase">
                    Your Personal Coach
                </p>
            </div>
        </div>
    );
}
