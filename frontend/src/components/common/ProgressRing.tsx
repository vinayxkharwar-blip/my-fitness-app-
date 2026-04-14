import React from "react";

interface ProgressRingProps {
    radius: number;
    stroke: number;
    progress: number;
    strokeColor?: string; // Optional single color fallback
    gradientId?: string; // ID for the gradient definition
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
    radius,
    stroke,
    progress,
    strokeColor = "currentColor",
    gradientId,
}) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="rotate-[-90deg] transition-all duration-500"
            >
                <circle
                    stroke="hsl(var(--muted))"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="opacity-20"
                />
                <circle
                    stroke={gradientId ? `url(#${gradientId})` : strokeColor}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-out"
                />
                {/* Optional: Add gradient definition if an ID is passed */}
                {gradientId && (
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--fitness-fire-from))" />
                            <stop offset="100%" stopColor="hsl(var(--fitness-fire-to))" />
                        </linearGradient>
                    </defs>
                )}
            </svg>
        </div>
    );
};
