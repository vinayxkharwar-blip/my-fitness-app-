import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/utils";
import { useProfile } from "@/hooks/useProfile";
import { Ruler, Weight, User as UserIcon, Calendar, ArrowRight, ChevronLeft, Activity } from "lucide-react";

// Static demo user - no auth dependency
const user = { id: "demo-user" };

export default function BodyMeasurements() {
    const navigate = useNavigate();
    const { updateProfile, isUpdating } = useProfile();

    // Height State
    const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
    const [heightCm, setHeightCm] = useState<number>(170);
    const [heightFt, setHeightFt] = useState<number>(5);
    const [heightIn, setHeightIn] = useState<number>(7);

    // Weight State
    const [weight, setWeight] = useState<number>(70);

    // Age & Gender State
    const [age, setAge] = useState<number>(25);
    const [gender, setGender] = useState<"male" | "female" | "other" | null>(null);

    // Activity State
    const [activity, setActivity] = useState<string>("light");

    const handleContinue = () => {
        updateProfile({
            age: age,
            height_cm: heightUnit === 'cm' ? heightCm : Math.round((heightFt * 12 + heightIn) * 2.54),
            weight_kg: weight,
            activity_level: activity as "sedentary" | "light" | "moderate" | "active" | "very_active",
            gender: gender || "male"
        }, {
            onSuccess: () => {
                window.location.href = "/home";
            }
        });
    };

    const toggleHeightUnit = (unit: "cm" | "ft") => {
        if (unit === heightUnit) return;
        setHeightUnit(unit);
        if (unit === "ft") {
            const totalInches = heightCm / 2.54;
            setHeightFt(Math.floor(totalInches / 12));
            setHeightIn(Math.round(totalInches % 12));
        } else {
            const totalInches = heightFt * 12 + heightIn;
            setHeightCm(Math.round(totalInches * 2.54));
        }
    };

    const handleInchesChange = (val: number) => {
        setHeightFt(Math.floor(val / 12));
        setHeightIn(val % 12);
    };

    const totalInches = (heightFt * 12) + heightIn;

    return (
        <div className="min-h-[100dvh] w-full bg-[#0b0f1a] pb-10 text-[#f5f0e8] font-sans relative flex flex-col items-center overflow-x-hidden">
            <style>{`
                .custom-range {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                }
                .custom-range::-webkit-slider-runnable-track {
                    height: 4px;
                    border-radius: 4px;
                    background: rgba(255,255,255,0.1);
                }
                .emerald-range::-webkit-slider-runnable-track {
                    background: linear-gradient(to right, #34d399 var(--val, 0%), rgba(255,255,255,0.1) var(--val, 0%));
                }
                .orange-range::-webkit-slider-runnable-track {
                    background: linear-gradient(to right, #f97316 var(--val, 0%), rgba(255,255,255,0.1) var(--val, 0%));
                }
                .custom-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    margin-top: -8px;
                    border: 2px solid #0b0f1a;
                    cursor: pointer;
                }
                .emerald-range::-webkit-slider-thumb {
                    background: #34d399;
                    box-shadow: 0 0 14px rgba(52,211,153,0.6);
                }
                .orange-range::-webkit-slider-thumb {
                    background: #f97316;
                    box-shadow: 0 0 14px rgba(249,115,22,0.6);
                }
            `}</style>

            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#f97316] opacity-[0.06] rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <header className="w-full max-w-[390px] px-4 pt-8 pb-4 flex flex-col gap-4 relative z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-[40px] h-[40px] flex shrink-0 items-center justify-center rounded-full bg-[#141927] hover:bg-[#1a2035] transition-colors border border-white/[0.07]"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="flex-1 flex justify-between items-start">
                        <div>
                            <h1 className="text-[1.3rem] font-bold font-heading text-[#f5f0e8] tracking-tight whitespace-nowrap">
                                Body Details
                            </h1>
                            <p className="text-[0.75rem] text-[#6b7a99] font-medium">Enter your measurements</p>
                        </div>
                        <div className="inline-flex shrink-0 items-center justify-center px-3 py-1 rounded-full bg-[#34d399]/15 text-[#34d399] text-[10px] font-bold tracking-widest uppercase">
                            3 / 4
                        </div>
                    </div>
                </div>
                {/* Progress Track */}
                <div className="w-full h-1 bg-white/[0.07] rounded-full overflow-hidden mt-1 relative">
                    <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
            </header>

            <main className="w-full max-w-[390px] px-4 space-y-[12px] relative z-10 flex-1">

                {/* GENDER SECTION */}
                <div className="bg-[#141927] rounded-[22px] p-[20px] border border-white/[0.07]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-[22px] h-[22px] rounded-md bg-[#34d399]/10 flex items-center justify-center">
                            <UserIcon size={12} className="text-[#34d399]" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b7a99]">Gender</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'male', label: 'Male', emoji: '♂️' },
                            { id: 'female', label: 'Female', emoji: '♀️' },
                            { id: 'other', label: 'Other', emoji: '⚧️' }
                        ].map(g => (
                            <button key={g.id}
                                onClick={() => setGender(g.id as "male" | "female" | "other")}
                                className={cn(
                                    "rounded-[14px] p-[13px] flex flex-col items-center gap-1 transition-all duration-300 border",
                                    gender === g.id
                                        ? "bg-gradient-to-br from-[#34d399]/[0.15] to-[#059669]/[0.08] border-[#34d399]/40 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                                        : "bg-[#1a2035] border-white/5 hover:border-white/10"
                                )}
                            >
                                <span className="text-xl">{g.emoji}</span>
                                <span className={cn("text-[0.7rem] uppercase tracking-wider font-bold mt-1", gender === g.id ? "text-[#34d399]" : "text-[#6b7a99]")}>
                                    {g.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* AGE SECTION */}
                <div className="bg-[#141927] rounded-[22px] p-[20px] border border-white/[0.07]">
                    <div className="flex items-center justify-between mb-2 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-[22px] h-[22px] rounded-md bg-[#34d399]/10 flex items-center justify-center">
                                <Calendar size={12} className="text-[#34d399]" />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b7a99]">Age</span>
                        </div>
                        <div className="flex justify-end items-end gap-1">
                            <span className="text-[2.2rem] font-bold font-heading text-[#f5f0e8] leading-none tracking-tighter">{age}</span>
                            <span className="text-sm font-medium text-[#6b7a99] pb-[2px]">yrs</span>
                        </div>
                    </div>
                    <div className="relative w-full h-6 flex items-center">
                        <input
                            type="range" min="16" max="80" value={age} onChange={e => setAge(parseInt(e.target.value))}
                            className="custom-range emerald-range absolute w-full inset-0 m-auto cursor-pointer"
                            style={{ "--val": `${((age - 16) / (80 - 16)) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                </div>

                {/* HEIGHT SECTION */}
                <div className="bg-[#141927] rounded-[22px] p-[20px] border border-white/[0.07]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-[22px] h-[22px] rounded-md bg-[#34d399]/10 flex items-center justify-center">
                                <Ruler size={12} className="text-[#34d399]" />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b7a99]">Height</span>
                        </div>
                        <div className="flex bg-[#1a2035] p-1 rounded-xl border border-white/5">
                            <button onClick={() => toggleHeightUnit('cm')} className={cn("px-4 py-1.5 rounded-[8px] text-[10px] font-bold uppercase transition-colors shrink-0", heightUnit === 'cm' ? "bg-[#34d399] text-[#0b0f1a] shadow-sm" : "text-[#6b7a99]")}>CM</button>
                            <button onClick={() => toggleHeightUnit('ft')} className={cn("px-4 py-1.5 rounded-[8px] text-[10px] font-bold uppercase transition-colors shrink-0", heightUnit === 'ft' ? "bg-[#34d399] text-[#0b0f1a] shadow-sm" : "text-[#6b7a99]")}>FT</button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-2 mb-6 mt-2">
                        {heightUnit === 'cm' ? (
                            <>
                                <span className="text-[4rem] font-bold font-heading text-[#f5f0e8] leading-none tracking-tighter">{heightCm}</span>
                                <span className="text-[1.2rem] font-bold text-[#34d399] mt-4">cm</span>
                            </>
                        ) : (
                            <>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[4rem] font-bold font-heading text-[#f5f0e8] leading-none tracking-tighter">{heightFt}</span>
                                    <span className="text-[1.2rem] font-bold text-[#34d399]">ft</span>
                                </div>
                                <div className="flex items-baseline gap-1 ml-2">
                                    <span className="text-[4rem] font-bold font-heading text-[#f5f0e8] leading-none tracking-tighter">{heightIn}</span>
                                    <span className="text-[1.2rem] font-bold text-[#34d399]">in</span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative w-full h-6 flex items-center">
                        {heightUnit === 'cm' ? (
                            <input
                                type="range" min="140" max="220" value={heightCm} onChange={e => setHeightCm(parseInt(e.target.value))}
                                className="custom-range emerald-range absolute w-full inset-0 m-auto cursor-pointer"
                                style={{ "--val": `${((heightCm - 140) / (220 - 140)) * 100}%` } as React.CSSProperties}
                            />
                        ) : (
                            <input
                                type="range" min="55" max="86" value={totalInches} onChange={e => handleInchesChange(parseInt(e.target.value))}
                                className="custom-range emerald-range absolute w-full inset-0 m-auto cursor-pointer"
                                style={{ "--val": `${((totalInches - 55) / (86 - 55)) * 100}%` } as React.CSSProperties}
                            />
                        )}
                    </div>
                </div>

                {/* WEIGHT SECTION */}
                <div className="bg-[#141927] rounded-[22px] p-[20px] border border-white/[0.07]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-[22px] h-[22px] rounded-md bg-[#34d399]/10 flex items-center justify-center">
                            <Weight size={12} className="text-[#34d399]" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b7a99]">Weight</span>
                    </div>

                    <div className="flex justify-center flex-wrap gap-2 mb-6">
                        {[
                            { l: 'Under 60', min: 0, max: 59, target: 55 },
                            { l: '60–80', min: 60, max: 80, target: 70 },
                            { l: '80–100', min: 81, max: 100, target: 90 },
                            { l: '100+', min: 101, max: 150, target: 110 }
                        ].map(r => {
                            const isActive = weight >= r.min && weight <= r.max;
                            return (
                                <button key={r.l}
                                    className={cn("px-4 py-2 rounded-full text-[0.7rem] uppercase tracking-wider font-bold transition-all border", isActive ? "bg-[#34d399]/15 border-[#34d399]/30 text-[#34d399]" : "bg-[#1a2035] border-white/5 text-[#6b7a99] hover:border-white/10")}
                                    onClick={() => setWeight(r.target)}
                                >
                                    {r.l}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-center items-center gap-2 mb-6">
                        <span className="text-[3.6rem] font-bold font-heading text-[#f5f0e8] leading-none tracking-tighter">{weight}</span>
                        <span className="text-[1.2rem] font-bold text-[#f97316] mt-3">kg</span>
                    </div>

                    <div className="relative w-full h-6 flex items-center mb-2">
                        <input
                            type="range" min="40" max="150" value={weight} onChange={e => setWeight(parseInt(e.target.value))}
                            className="custom-range orange-range absolute w-full inset-0 m-auto cursor-pointer"
                            style={{ "--val": `${((weight - 40) / (150 - 40)) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                </div>

                {/* ACTIVITY LEVEL SECTION */}
                <div className="bg-[#141927] rounded-[22px] p-[20px] border border-white/[0.07]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-[22px] h-[22px] rounded-md bg-[#34d399]/10 flex items-center justify-center">
                            <Activity size={12} className="text-[#34d399]" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b7a99]">Activity Level</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise', emoji: '🛋️' },
                            { id: 'light', label: 'Light', desc: '1–3 days/week', emoji: '🚶' },
                            { id: 'moderate', label: 'Moderate', desc: '3–5 days/week', emoji: '🏃' },
                            { id: 'active', label: 'Very Active', desc: '6–7 days/week', emoji: '🏋️' }
                        ].map(a => (
                            <button key={a.id}
                                onClick={() => setActivity(a.id)}
                                className={cn(
                                    "p-[14px] rounded-[14px] flex flex-col items-center gap-1 transition-all duration-300 border text-center h-full",
                                    activity === a.id
                                        ? "bg-[#34d399]/[0.08] border-[#34d399]/[0.35] shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                                        : "bg-[#1a2035] border-white/5 hover:border-white/10"
                                )}
                            >
                                <span className="text-3xl mb-1">{a.emoji}</span>
                                <span className="text-[0.8rem] font-bold text-[#f5f0e8] mt-1">{a.label}</span>
                                <span className="text-[0.65rem] text-[#6b7a99] font-medium leading-tight mt-[2px]">{a.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 pb-4 w-full">
                    <button
                        onClick={handleContinue}
                        disabled={isUpdating}
                        className={cn(
                            "w-full h-14 rounded-[16px] font-bold text-[#064e3b] text-base flex items-center justify-center transition-all bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_28px_rgba(52,211,153,0.35)] hover:scale-[1.02]",
                            isUpdating ? "opacity-75 cursor-not-allowed" : ""
                        )}
                    >
                        {isUpdating ? "Saving..." : "Save & Continue"} {!isUpdating && <ArrowRight className="w-5 h-5 ml-2" />}
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full mt-3 h-12 rounded-[16px] font-bold text-[#6b7a99] text-sm flex items-center justify-center transition-all hover:text-white"
                    >
                        Skip for now
                    </button>
                </div>

            </main>
        </div>
    );
}
