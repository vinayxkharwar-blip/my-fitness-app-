import { useEffect, useState } from "react";
import { cn } from "@/utils/utils";

export default function Splash() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Trigger initial fade in
        const t = setTimeout(() => setShow(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center bg-[#0b0f1a] selection:bg-[#34d399]/30 font-sans" style={{ fontFamily: '"Sora", sans-serif' }}>

            {/* Inject Font and Custom Keyframes */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sora:wght@100..800&display=swap');
                    
                    @keyframes progress-fill {
                        0% { width: 0%; }
                        100% { width: 100%; }
                    }
                    @keyframes pulse-ring {
                        0% { transform: scale(1); opacity: 0.6; }
                        50% { transform: scale(1.4); opacity: 0; }
                        100% { transform: scale(1); opacity: 0; }
                    }
                    @keyframes blink-slow {
                        0%, 100% { opacity: 0.4; }
                        50% { opacity: 0.8; }
                    }
                    @keyframes float-gentle {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                `}
            </style>

            {/* Background Layers */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 60% at 50% 30%, #0f2040 0%, transparent 100%),
                        radial-gradient(ellipse 60% 40% at 20% 80%, #071510 0%, transparent 100%),
                        #0b0f1a
                    `
                }}
            />

            {/* Ambient Blurred Orbs */}
            <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#34d399]/5 blur-[100px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#1e40af]/10 blur-[100px] mix-blend-screen pointer-events-none" />
            <div className="absolute top-[50%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-[#0b0f1a]/50 blur-[100px] mix-blend-screen pointer-events-none" />

            {/* Faint Grid Texture Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.018) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)
                    `,
                    backgroundSize: '72px 72px'
                }}
            />

            {/* Film Grain (SVG feTurbulence) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] z-[1]">
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>

            {/* Four Corners Tiny Labels */}
            <div className="absolute top-6 left-6 text-[9px] uppercase tracking-widest text-[#f5f0e8] opacity-10 font-bold z-10">v2.4.1</div>
            <div className="absolute top-6 right-6 text-[9px] uppercase tracking-widest text-[#f5f0e8] opacity-10 font-bold z-10">FitSnap™</div>
            <div className="absolute bottom-6 left-6 text-[9px] uppercase tracking-widest text-[#f5f0e8] opacity-10 font-bold z-10">AI Wellness</div>
            <div className="absolute bottom-6 right-6 text-[9px] uppercase tracking-widest text-[#f5f0e8] opacity-10 font-bold z-10">© 2026</div>

            {/* Main Center Layout */}
            <div className={cn(
                "relative z-20 flex flex-col items-center justify-center w-full transition-all duration-1000 ease-out",
                show ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-4"
            )}>

                {/* App Icon Container */}
                <div
                    className="relative flex items-center justify-center w-[120px] h-[120px] rounded-[28px] mb-8"
                    style={{
                        background: 'linear-gradient(135deg, #1e2a3a 0%, #141927 100%)',
                        boxShadow: '0 0 0 1px rgba(52,211,153,0.1), 0 20px 40px -10px rgba(0,0,0,0.8), 0 0 30px rgba(52,211,153,0.15)',
                        animation: 'float-gentle 6s ease-in-out infinite'
                    }}
                >
                    {/* Concentric Glow Rings */}
                    <div className="absolute inset-0 rounded-[28px] border border-[#34d399]" style={{ animation: 'pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite' }} />
                    <div className="absolute inset-[-20px] rounded-[48px] border border-[#34d399]/20" style={{ animation: 'pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 1.5s' }} />

                    {/* ECG SVG */}
                    <svg viewBox="0 0 64 64" className="w-[64px] h-[64px] relative z-10 overflow-visible">
                        <defs>
                            <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#34d399" />
                                <stop offset="100%" stopColor="#6ee7b7" />
                            </linearGradient>
                            <filter id="ecg-glow">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#34d399" floodOpacity="0.6" />
                            </filter>
                        </defs>
                        <polyline
                            points="6,32 16,32 21,18 30,46 37,24 43,32 58,32"
                            fill="none"
                            stroke="url(#ecg-grad)"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#ecg-glow)"
                        />
                        {/* Glowing Endpoint */}
                        <circle cx="58" cy="32" r="2.5" fill="#ffffff" filter="url(#ecg-glow)">
                            <animate attributeName="r" values="2.5; 4; 2.5" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1; 0.6; 1" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                {/* Wordmark */}
                <h1
                    className="text-[2.8rem] leading-none mb-3"
                    style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }}
                >
                    <span className="font-bold text-[#f5f0e8]">Fit</span>
                    <span className="font-bold italic text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #34d399, #6ee7b7)' }}>
                        Snap
                    </span>
                </h1>

                {/* Tagline */}
                <p
                    className="text-[#3d5066] uppercase font-semibold mb-16"
                    style={{ fontSize: '0.68rem', letterSpacing: '0.22em' }}
                >
                    Transform your life with AI
                </p>

                {/* Loading Progress Bar Container */}
                <div className="flex flex-col items-center gap-4 mt-8">
                    <div
                        className="w-[160px] h-[2px] rounded-full overflow-hidden relative"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    >
                        <div
                            className="absolute top-0 left-0 h-full rounded-full"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #10b981, #34d399)',
                                boxShadow: '0 0 10px rgba(52,211,153,0.6)',
                                animation: show ? 'progress-fill 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
                                width: show ? '100%' : '0%'
                            }}
                        />
                    </div>

                    <p
                        className="text-[#34d399] uppercase font-bold"
                        style={{
                            fontSize: '0.55rem',
                            letterSpacing: '0.15em',
                            animation: 'blink-slow 2s ease-in-out infinite'
                        }}
                    >
                        Initializing your journey
                    </p>
                </div>

            </div>
        </div>
    );
}
