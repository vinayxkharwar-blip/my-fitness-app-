export function Logo({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 250 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="fit-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                <linearGradient id="fit-text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                </linearGradient>

                <filter id="fit-icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#34d399" floodOpacity="0.4" />
                </filter>
            </defs>

            {/* Icon Background with Shadow */}
            <g filter="url(#fit-icon-shadow)">
                <rect x="3" y="3" width="64" height="64" rx="18" fill="url(#fit-icon-grad)" />
            </g>

            {/* Heartbeat Path */}
            <polyline
                points="18,40 28,40 33,26 40,54 47,34 53,40 62,40"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="62" cy="40" r="3" fill="#ffffff" />

            {/* Wordmark */}
            <text x="82" y="44" fontFamily="Georgia, 'Playfair Display', serif" fontWeight="bold" fontSize="38" letterSpacing="-1">
                <tspan fill="#f5f0e8">Fit</tspan>
                <tspan fill="url(#fit-text-grad)">Snap</tspan>
            </text>

            {/* Subtitle */}
            <text x="84" y="60" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="normal" fontSize="10" fill="#6b7a99" letterSpacing="2.5">
                AI-POWERED WELLNESS
            </text>
        </svg>
    );
}
