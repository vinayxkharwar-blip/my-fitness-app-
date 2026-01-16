
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button";
import { cn } from "@/utils/utils";
import { useAuth } from "@/context/AuthContext";
import { Ruler, Weight, User as UserIcon, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Slider } from "@/components/common/slider";

export default function BodyMeasurements() {
    const navigate = useNavigate();
    const { user, login, token } = useAuth();

    // Height State
    const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
    const [heightCm, setHeightCm] = useState<number>(170);
    const [heightFt, setHeightFt] = useState<number>(5);
    const [heightIn, setHeightIn] = useState<number>(7);

    // Weight State
    const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
    const [weight, setWeight] = useState<number>(70);

    // Age & Gender State
    const [age, setAge] = useState<number>(25);
    const [gender, setGender] = useState<"male" | "female" | "other">("male");

    // Loading state for the button
    const [isSaving, setIsSaving] = useState(false);

    const handleContinue = async () => {
        setIsSaving(true);
        try {
            const userId = user?.id || (user as any)?.user_id;

            if (userId) {
                // 1. Send update to Backend
                const response = await fetch("http://localhost:5000/profile/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: userId,
                        height_cm: heightCm,
                        weight_kg: weight,
                        activity_level: "moderate",
                        age: age,
                        gender: gender,
                        is_profile_complete: true // Ensure backend marks it complete
                    })
                });

                if (response.ok) {
                    // 2. Update Local State (Context + LocalStorage) to avoid redirect loop
                    if (user && token) {
                        const updatedUser = { ...user, is_profile_complete: true };
                        login(token, updatedUser);
                    }

                    // 3. Navigate to Home
                    navigate("/home");
                } else {
                    console.error("Backend failed to update profile");
                }
            }
        } catch (err) {
            console.error("Failed to save measurements", err);
        } finally {
            setIsSaving(false);
        }
    };

    const toggleHeightUnit = (unit: "cm" | "ft") => {
        if (unit === heightUnit) return;
        setHeightUnit(unit);
        if (unit === "ft") {
            // Convert cm to ft/in
            const totalInches = heightCm / 2.54;
            setHeightFt(Math.floor(totalInches / 12));
            setHeightIn(Math.round(totalInches % 12));
        } else {
            // Convert ft/in to cm
            const totalInches = heightFt * 12 + heightIn;
            setHeightCm(Math.round(totalInches * 2.54));
        }
    };

    const toggleWeightUnit = (unit: "kg" | "lb") => {
        if (unit === weightUnit) return;
        setWeightUnit(unit);
        if (unit === "lb") {
            setWeight(Math.round(weight * 2.20462));
        } else {
            setWeight(Math.round(weight / 2.20462));
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-32 text-[#1F2937] font-sans selection:bg-[#9ED9E6]/30 relative">

            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#9ED9E6]/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <header className="px-6 pt-8 pb-6 flex items-center gap-4 sticky top-0 z-20 bg-[#E9EEF3]/90 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-black/5 text-[#1F2937] transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold font-heading text-[#1F2937] tracking-tight">Body Details</h1>
                    <p className="text-sm text-gray-500 font-medium">Enter your body measurements</p>
                </div>
            </header>

            <main className="px-6 space-y-6 relative z-10">

                {/* Gender & Age Card */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white space-y-6">

                    {/* Gender */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                            <UserIcon size={14} /> Gender
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {["Male", "Female", "Other"].map((g) => {
                                const val = g.toLowerCase() as "male" | "female" | "other";
                                const isSelected = gender === val;
                                return (
                                    <button
                                        key={g}
                                        className={cn(
                                            "py-3 rounded-2xl font-bold text-sm transition-all duration-300",
                                            isSelected
                                                ? "bg-[#FFA07A] text-white shadow-lg shadow-[#FFA07A]/30"
                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        )}
                                        onClick={() => setGender(val)}
                                    >
                                        {g}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100"></div>

                    {/* Age */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                                <Calendar size={14} /> Age
                            </label>
                            <span className="text-3xl font-extrabold text-[#1F2937] font-heading tracking-tight">{age}</span>
                        </div>
                        <Slider
                            value={[age]}
                            min={16}
                            max={100}
                            step={1}
                            onValueChange={(vals) => setAge(vals[0])}
                            className="py-2"
                        />
                    </div>
                </div>

                {/* Height Card */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white">
                    <div className="flex items-center justify-between mb-6">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                            <Ruler size={14} /> Height
                        </label>
                        <div className="flex bg-[#F7FAFC] rounded-xl p-1">
                            <button
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    heightUnit === "cm" ? "bg-white text-[#1F2937] shadow-sm" : "text-gray-400 hover:text-gray-600"
                                )}
                                onClick={() => toggleHeightUnit("cm")}
                            >
                                CM
                            </button>
                            <button
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    heightUnit === "ft" ? "bg-white text-[#1F2937] shadow-sm" : "text-gray-400 hover:text-gray-600"
                                )}
                                onClick={() => toggleHeightUnit("ft")}
                            >
                                FT
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-baseline gap-1 py-2 mb-4">
                        {heightUnit === "cm" ? (
                            <>
                                <span className="text-6xl font-extrabold text-[#1F2937] font-heading tracking-tighter">{heightCm}</span>
                                <span className="text-[#FFA07A] font-bold text-lg">cm</span>
                            </>
                        ) : (
                            <div className="flex items-baseline gap-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-6xl font-extrabold text-[#1F2937] font-heading tracking-tighter">{heightFt}</span>
                                    <span className="text-[#FFA07A] font-bold text-lg">ft</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-6xl font-extrabold text-[#1F2937] font-heading tracking-tighter">{heightIn}</span>
                                    <span className="text-[#FFA07A] font-bold text-lg">in</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {heightUnit === "cm" && (
                        <Slider
                            value={[heightCm]}
                            min={100}
                            max={250}
                            step={1}
                            onValueChange={(vals) => setHeightCm(vals[0])}
                            className="py-2"
                        />
                    )}
                </div>

                {/* Weight Card */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white">
                    <div className="flex items-center justify-between mb-6">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                            <Weight size={14} /> Weight
                        </label>
                        <div className="flex bg-[#F7FAFC] rounded-xl p-1">
                            <button
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    weightUnit === "kg" ? "bg-white text-[#1F2937] shadow-sm" : "text-gray-400 hover:text-gray-600"
                                )}
                                onClick={() => toggleWeightUnit("kg")}
                            >
                                KG
                            </button>
                            <button
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    weightUnit === "lb" ? "bg-white text-[#1F2937] shadow-sm" : "text-gray-400 hover:text-gray-600"
                                )}
                                onClick={() => toggleWeightUnit("lb")}
                            >
                                LB
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-baseline gap-1 py-2 mb-4">
                        <span className="text-6xl font-extrabold text-[#1F2937] font-heading tracking-tighter">{weight}</span>
                        <span className="text-[#FFA07A] font-bold text-lg">{weightUnit}</span>
                    </div>

                    <Slider
                        value={[weight]}
                        min={30}
                        max={200}
                        step={1}
                        onValueChange={(vals) => setWeight(vals[0])}
                        className="py-2"
                    />
                </div>

                {/* Action Button */}
                <div className="space-y-3 pt-4">
                    <Button
                        className="w-full h-14 rounded-[2rem] text-base font-bold bg-[#FFA07A] hover:bg-[#FF8C60] text-white shadow-xl shadow-[#FFA07A]/20 transition-all hover:scale-[1.02] border-none"
                        onClick={handleContinue}
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Details"} {!isSaving && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="w-full h-14 rounded-[2rem] text-base font-bold border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm"
                    >
                        Cancel
                    </Button>
                </div>

                <p className="text-[10px] text-gray-400 text-center font-medium pt-2">
                    Your body details help us create a personalized fitness and nutrition plan.
                </p>

            </main>
        </div>
    );
}
