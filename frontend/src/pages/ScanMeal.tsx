import { Button } from "@/components/ui/button";
import { Camera, Edit3, Check, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";

export default function ScanMeal() {
    const navigate = useNavigate();
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const handleCapture = (image: string) => {
        setCapturedImage(image);
        setIsCameraOpen(false);
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setIsCameraOpen(true);
    };

    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in p-6 flex flex-col items-center justify-center">
            {isCameraOpen && (
                <CameraCapture onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />
            )}

            <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8">

                {/* Mode Toggle */}
                <div className="flex bg-muted rounded-full p-1 mb-4 w-64">
                    <button
                        className={cn(
                            "flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200",
                            "bg-white text-primary shadow-sm"
                        )}
                        onClick={() => { }}
                    >
                        Meal Scan
                    </button>
                    <button
                        className={cn(
                            "flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200",
                            "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => navigate("/body")}
                    >
                        Body Scan
                    </button>
                </div>

                {/* Main Visual */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                    {capturedImage ? (
                        <div className="h-64 w-64 rounded-3xl bg-card border-4 border-white shadow-premium overflow-hidden relative z-10">
                            <img src={capturedImage} alt="Captured Meal" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="h-40 w-40 rounded-full bg-card border-4 border-white shadow-premium flex items-center justify-center text-primary relative z-10 transition-transform hover:scale-105 duration-300">
                            <Camera size={48} />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-bold font-heading text-slate-900">
                        {capturedImage ? "Meal Captured!" : "Snap Your Meal"}
                    </h1>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-[280px] mx-auto">
                        {capturedImage
                            ? "Looks delicious! Ready to analyze?"
                            : "Point your camera at food to get instant calorie and macro breakdown using AI."}
                    </p>
                </div>

                <div className="w-full space-y-4 pt-4">
                    {capturedImage ? (
                        <div className="space-y-3 w-full">
                            <Button
                                className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => {
                                    // Handle analysis logic here
                                    alert("Analyzing meal...");
                                }}
                            >
                                <Check className="mr-2 w-5 h-5" /> Analyze Meal
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-2xl text-lg font-medium border-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                onClick={handleRetake}
                            >
                                <RotateCcw className="mr-2 w-5 h-5" /> Retake Photo
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button
                                className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => setIsCameraOpen(true)}
                            >
                                <Camera className="mr-2 w-5 h-5" /> Open Camera
                            </Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-border"></div>
                                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">OR</span>
                                <div className="flex-grow border-t border-border"></div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-2xl text-lg font-medium border-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                onClick={() => navigate("/home")}
                            >
                                <Edit3 className="mr-2 w-5 h-5" /> Add Meal Manually
                            </Button>
                            <p className="text-xs text-muted-foreground">Search food and adjust portions yourself</p>
                        </>
                    )}
                </div>

                {!capturedImage && (
                    <p className="text-[10px] text-muted-foreground/60 max-w-xs pt-8">
                        * Camera results are AI-based estimates and can be edited anytime.
                    </p>
                )}
            </div>
        </div>
    );
}
