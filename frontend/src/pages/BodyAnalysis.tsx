import { Button } from "@/components/ui/button";
import { Scan, ClipboardList, Check, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";

export default function BodyAnalysis() {
    const navigate = useNavigate();
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleCapture = (image: string) => {
        setCapturedImage(image);
        setIsCameraOpen(false);
        setResult(null); // Reset previous results
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setResult(null);
        setIsCameraOpen(true);
    };

    const analyzeBody = async () => {
        if (!capturedImage) return;
        setIsAnalyzing(true);
        try {
            const response = await fetch("http://10.26.96.172:5000/api/body-analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: capturedImage }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            alert("Analysis failed. Try again.");
        } finally {
            setIsAnalyzing(false);
        }
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
                            "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => navigate("/scan")}
                    >
                        Meal Scan
                    </button>
                    <button
                        className={cn(
                            "flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200",
                            "bg-white text-indigo-600 shadow-sm"
                        )}
                        onClick={() => { }}
                    >
                        Body Scan
                    </button>
                </div>

                {/* Main Visual */}
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                    {capturedImage ? (
                        <div className="h-64 w-64 rounded-3xl bg-card border-4 border-white shadow-premium overflow-hidden relative z-10">
                            <img src={capturedImage} alt="Captured Body" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="h-40 w-40 rounded-full bg-card border-4 border-white shadow-premium flex items-center justify-center text-indigo-600 relative z-10 transition-transform hover:scale-105 duration-300">
                            <Scan size={48} />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-bold font-heading text-slate-900">
                        {capturedImage ? "Photo Captured" : "Analyze Your Body"}
                    </h1>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-[280px] mx-auto">
                        {capturedImage
                            ? "Ready to analyze your body composition?"
                            : "Use AI to visually estimate body shape and posture, or enter details manually."}
                    </p>
                </div>

                {/* Results Display */}
                {result && (
                    <div className="w-full bg-card rounded-2xl p-6 shadow-premium space-y-4 animate-fade-in border border-border">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Body Type</h3>
                            <p className="text-2xl font-bold text-indigo-600">{result.bodyType}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase">Est. Body Fat</h3>
                                <p className="text-lg font-bold text-slate-800">{result.bodyFat}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase">Posture</h3>
                                <p className="text-lg font-bold text-slate-800">{result.posture}</p>
                            </div>
                        </div>
                        {result.suggestion && (
                            <div className="bg-indigo-50 p-4 rounded-xl">
                                <p className="text-sm text-indigo-800 font-medium">💡 {result.suggestion}</p>
                            </div>
                        )}
                        <p className="text-[10px] text-muted-foreground italic text-center pt-2">
                            * AI visual estimate. Not medical advice.
                        </p>
                    </div>
                )}

                <div className="w-full space-y-4 pt-4">
                    {capturedImage ? (
                        <div className="space-y-3 w-full">
                            <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={analyzeBody}
                                disabled={isAnalyzing}
                            >
                                <Check className="mr-2 w-5 h-5" />
                                {isAnalyzing ? "Analyzing..." : "Analyze Scan"}
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
                            <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => setIsCameraOpen(true)}
                            >
                                <Scan className="mr-2 w-5 h-5" /> Start Body Scan
                            </Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-border"></div>
                                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">OR</span>
                                <div className="flex-grow border-t border-border"></div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-2xl text-lg font-medium border-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                onClick={() => navigate("/onboarding/measurements")}
                            >
                                <ClipboardList className="mr-2 w-5 h-5" /> Enter Body Details Manually
                            </Button>
                        </>
                    )}
                </div>

                {!capturedImage && (
                    <p className="text-[10px] text-muted-foreground/60 max-w-xs pt-8">
                        * This is an AI-based visual estimation, not medical advice.
                    </p>
                )}
            </div>
        </div>
    );
}
