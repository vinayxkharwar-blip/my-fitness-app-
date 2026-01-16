import { Button } from "@/components/common/button";
import { Scan, ClipboardList, Check, RotateCcw, Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/utils";
import { useState } from "react";
import CameraCapture from "@/components/features/camera/CameraCapture";

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
            const response = await fetch("/api/body-analyze", {
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
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-24 text-[#1F2937] animate-fade-in p-6 flex flex-col items-center justify-center font-sans selection:bg-[#FFA07A]/30 relative">

            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#9ED9E6]/10 rounded-full blur-[120px] pointer-events-none"></div>

            {isCameraOpen && (
                <CameraCapture onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />
            )}

            <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8 relative z-10 pt-8">

                {/* Header Row: Back Button + Toggle */}
                <div className="w-full relative flex items-center justify-center px-4 mb-6 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-4 p-2 rounded-full hover:bg-black/5 text-[#1F2937] transition-all"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    {/* Mode Toggle */}
                    <div className="flex bg-white/60 backdrop-blur-md rounded-full p-1.5 border border-white shadow-lg shadow-blue-900/5 hover:scale-[1.01] transition-transform w-[240px]">
                        <button
                            className={cn(
                                "flex-1 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300",
                                "text-gray-400 hover:text-gray-600"
                            )}
                            onClick={() => navigate("/scan")}
                        >
                            Meal Scan
                        </button>
                        <button
                            className={cn(
                                "flex-1 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300",
                                "bg-white text-[#FFA07A] shadow-md"
                            )}
                            onClick={() => { }}
                        >
                            Body Scan
                        </button>
                    </div>
                </div>

                {/* Main Visual */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-[#FFA07A]/20 blur-3xl rounded-full group-hover:bg-[#FFA07A]/30 transition-all duration-500"></div>
                    {capturedImage ? (
                        <div className="h-64 w-64 rounded-[2.5rem] bg-white border-4 border-white shadow-2xl shadow-blue-900/10 overflow-hidden relative z-10">
                            <img src={capturedImage} alt="Captured Body" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div
                            className="h-52 w-52 rounded-full bg-white border-4 border-white shadow-2xl shadow-blue-900/10 flex items-center justify-center text-[#FFA07A] relative z-10 transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => setIsCameraOpen(true)}
                        >
                            <Scan size={64} className="drop-shadow-sm opacity-80" />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold font-heading text-[#1F2937] tracking-tight">
                        {capturedImage ? "Photo Captured" : "Analyze Your Body"}
                    </h1>
                    <p className="text-gray-500 text-base leading-relaxed max-w-[280px] mx-auto font-medium">
                        {capturedImage
                            ? "Ready to analyze your body composition?"
                            : "Use AI to visually estimate body shape and posture."}
                    </p>
                </div>

                {/* Results Display */}
                {result && (
                    <div className="w-full bg-white backdrop-blur-md rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 space-y-4 animate-fade-in border border-white">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Body Type</h3>
                            <p className="text-2xl font-bold text-[#FFA07A]">{result.bodyType}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Est. Body Fat</h3>
                                <p className="text-lg font-bold text-[#1F2937]">{result.bodyFat}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Posture</h3>
                                <p className="text-lg font-bold text-[#1F2937]">{result.posture}</p>
                            </div>
                        </div>
                        {result.suggestion && (
                            <div className="bg-[#FFF7ED] border border-[#FFEDD5] p-4 rounded-xl">
                                <p className="text-sm text-[#C2410C] font-medium">💡 {result.suggestion}</p>
                            </div>
                        )}
                        <p className="text-[10px] text-gray-400 italic text-center pt-2">
                            * AI visual estimate. Not medical advice.
                        </p>
                    </div>
                )}

                <div className="w-full space-y-4 pt-4">
                    {capturedImage ? (
                        <div className="space-y-3 w-full">
                            <Button
                                className="w-full h-14 rounded-[2rem] text-lg font-bold bg-[#FFA07A] hover:bg-[#FF8C60] text-white shadow-xl shadow-[#FFA07A]/20 transition-all hover:scale-[1.02] border-none"
                                onClick={analyzeBody}
                                disabled={isAnalyzing}
                            >
                                <Check className="mr-2 w-5 h-5" />
                                {isAnalyzing ? "Analyzing..." : "Analyze Scan"}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-[2rem] text-lg font-bold border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm"
                                onClick={handleRetake}
                            >
                                <RotateCcw className="mr-2 w-5 h-5" /> Retake Photo
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button
                                className="w-full h-14 rounded-[2rem] text-lg font-bold bg-[#FFA07A] hover:bg-[#FF8C60] text-white shadow-xl shadow-[#FFA07A]/20 transition-all hover:scale-[1.02] border-none"
                                onClick={() => setIsCameraOpen(true)}
                            >
                                <Scan className="mr-2 w-5 h-5" /> Start Body Scan
                            </Button>


                            {/* Manual Entry Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-[2rem] p-6 border-2 border-dashed border-[#9ED9E6] shadow-lg mt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-2xl bg-white shadow-sm">
                                        <ClipboardList className="w-6 h-6 text-[#9ED9E6]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-[#1F2937] mb-1">Enter Details Manually</h3>
                                        <p className="text-sm text-gray-500 font-medium mb-4">
                                            Prefer to input your measurements? Track height, weight, age, and more.
                                        </p>
                                        <Button
                                            className="w-full h-12 rounded-[2rem] text-base font-bold bg-[#9ED9E6] hover:bg-[#7EC4D4] text-white shadow-lg shadow-[#9ED9E6]/30 transition-all hover:scale-[1.02] border-none"
                                            onClick={() => navigate("/onboarding/body-measurements")}
                                        >
                                            <ClipboardList className="mr-2 w-5 h-5" /> Enter Body Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {!capturedImage && (
                    <p className="text-[10px] text-gray-400 max-w-xs pt-4 font-medium">
                        * This is an AI-based visual estimation, not medical advice.
                    </p>
                )}
            </div>
        </div>
    );
}
