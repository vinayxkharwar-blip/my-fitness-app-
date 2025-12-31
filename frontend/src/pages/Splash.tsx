import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export default function Splash() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-slate-900 to-black animate-fade-in text-white">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/10 rounded-b-[100%] blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-full h-96 bg-orange-500/5 rounded-t-[100%] blur-[100px] pointer-events-none"></div>

            <div className={cn("transition-all duration-1000 transform relative z-10 flex flex-col items-center", show ? "opacity-100 scale-100" : "opacity-0 scale-95")}>

                {/* Logo Container with Breathing Effect */}
                <div className="relative mb-12 animate-[pulse_3s_ease-in-out_infinite]">
                    {/* Glow behind logo */}
                    <div className="absolute inset-0 bg-white/5 blur-[50px] rounded-full scale-150"></div>

                    <img
                        src={logo}
                        alt="FitSnap AI"
                        className="w-48 md:w-56 object-contain relative z-10 drop-shadow-2xl"
                    />
                </div>

                {/* Tagline */}
                <h2 className="text-gray-400 font-medium text-sm tracking-[0.2em] uppercase mb-16 opacity-80">
                    Transform your life with AI
                </h2>

                {/* Sleek Loading Bar */}
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-[shimmer_1.5s_infinite_linear] opacity-80"></div>
                </div>
            </div>
        </div>
    );
}
