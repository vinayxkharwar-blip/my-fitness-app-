
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BodyMeasurements() {
    const navigate = useNavigate();

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

    const handleContinue = () => {
        // Save data logic here
        navigate("/home");
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
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 animate-fade-in pb-32">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold font-heading text-foreground">Tell us about your body</h1>
                    <p className="text-muted-foreground">This helps us calculate your personalized plan.</p>
                </div>

                <div className="space-y-6">

                    {/* Gender & Age Card */}
                    <Card className="border-border shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <Label className="text-lg font-semibold">Gender</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Male", "Female", "Other"].map((g) => {
                                        const val = g.toLowerCase() as "male" | "female" | "other";
                                        return (
                                            <button
                                                key={g}
                                                className={cn(
                                                    "py-3 rounded-xl font-medium transition-all border-2",
                                                    gender === val
                                                        ? "border-primary bg-primary/5 text-primary"
                                                        : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80 block"
                                                )}
                                                onClick={() => setGender(val)}
                                            >
                                                {g}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-semibold">Age</Label>
                                    <span className="text-2xl font-bold tracking-tight">{age}</span>
                                </div>
                                <Slider
                                    value={[age]}
                                    min={16}
                                    max={100}
                                    step={1}
                                    onValueChange={(vals) => setAge(vals[0])}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground px-1">
                                    <span>16</span>
                                    <span>100</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Height Card */}
                    <Card className="border-border shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Height</Label>
                                <div className="flex bg-muted rounded-lg p-1">
                                    <button
                                        className={cn(
                                            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                            heightUnit === "cm" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => toggleHeightUnit("cm")}
                                    >
                                        cm
                                    </button>
                                    <button
                                        className={cn(
                                            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                            heightUnit === "ft" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => toggleHeightUnit("ft")}
                                    >
                                        ft & in
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center items-end gap-2 py-4">
                                {heightUnit === "cm" ? (
                                    <>
                                        <span className="text-5xl font-bold tracking-tight">{heightCm}</span>
                                        <span className="text-muted-foreground pb-2">cm</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-5xl font-bold tracking-tight">{heightFt}</span>
                                        <span className="text-muted-foreground pb-2 mr-4">ft</span>
                                        <span className="text-5xl font-bold tracking-tight">{heightIn}</span>
                                        <span className="text-muted-foreground pb-2">in</span>
                                    </>
                                )}
                            </div>

                            {heightUnit === "cm" ? (
                                <Slider
                                    value={[heightCm]}
                                    min={100}
                                    max={250}
                                    step={1}
                                    onValueChange={(vals) => setHeightCm(vals[0])}
                                    className="py-4"
                                />
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground text-center block">Feet</Label>
                                        <Input
                                            type="number"
                                            value={heightFt}
                                            onChange={(e) => setHeightFt(Number(e.target.value))}
                                            className="text-center text-lg"
                                            min={3}
                                            max={8}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground text-center block">Inches</Label>
                                        <Input
                                            type="number"
                                            value={heightIn}
                                            onChange={(e) => setHeightIn(Number(e.target.value))}
                                            className="text-center text-lg"
                                            min={0}
                                            max={11}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Weight Card */}
                    <Card className="border-border shadow-sm">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Weight</Label>
                                <div className="flex bg-muted rounded-lg p-1">
                                    <button
                                        className={cn(
                                            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                            weightUnit === "kg" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => toggleWeightUnit("kg")}
                                    >
                                        kg
                                    </button>
                                    <button
                                        className={cn(
                                            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                            weightUnit === "lb" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => toggleWeightUnit("lb")}
                                    >
                                        lb
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center items-end gap-2 py-4">
                                <span className="text-5xl font-bold tracking-tight">{weight}</span>
                                <span className="text-muted-foreground pb-2">{weightUnit}</span>
                            </div>

                            <Slider
                                value={[weight]}
                                min={30}
                                max={200}
                                step={1}
                                onValueChange={(vals) => setWeight(vals[0])}
                                className="py-4"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground px-1">
                                <span>{weightUnit === 'kg' ? '30kg' : '66lb'}</span>
                                <span>{weightUnit === 'kg' ? '200kg' : '440lb'}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Button
                    className="w-full text-lg h-12"
                    size="lg"
                    onClick={handleContinue}
                >
                    Finish Setup
                </Button>
            </div>
        </div>
    );
}
