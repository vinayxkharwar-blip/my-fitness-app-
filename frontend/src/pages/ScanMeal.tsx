import { Button } from "@/components/ui/button";
import { Camera, Edit3, Check, RotateCcw, ArrowLeft } from "lucide-react";
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
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-24 text-[#1F2937] animate-fade-in p-6 flex flex-col items-center justify-center font-sans selection:bg-[#FFA07A]/30 relative">

            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFA07A]/10 rounded-full blur-[120px] pointer-events-none"></div>

            {isCameraOpen && (
                <CameraCapture onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />
            )}

            <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6 relative z-10 pt-4">

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
                                "bg-white text-[#FFA07A] shadow-md"
                            )}
                            onClick={() => { }}
                        >
                            Meal Scan
                        </button>
                        <button
                            className={cn(
                                "flex-1 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300",
                                "text-gray-400 hover:text-gray-600"
                            )}
                            onClick={() => navigate("/body")}
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
                            <img src={capturedImage} alt="Captured Meal" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div
                            className="h-52 w-52 rounded-full bg-white border-4 border-white shadow-2xl shadow-blue-900/10 flex items-center justify-center text-[#FFA07A] relative z-10 transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => setIsCameraOpen(true)}
                        >
                            <Camera size={64} className="drop-shadow-sm opacity-80" />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold font-heading text-[#1F2937] tracking-tight">
                        {capturedImage ? "Meal Captured!" : "Snap Your Meal"}
                    </h1>
                    <p className="text-gray-500 text-base leading-relaxed max-w-[280px] mx-auto font-medium">
                        {capturedImage
                            ? "Looks delicious! Ready to analyze?"
                            : "Point your camera at food to get instant calorie and macro breakdown."}
                    </p>
                </div>

                <div className="w-full space-y-4 pt-4">
                    {capturedImage ? (
                        <div className="space-y-3 w-full">
                            <Button
                                className="w-full h-14 rounded-[2rem] text-lg font-bold bg-[#FFA07A] hover:bg-[#FF8C60] text-white shadow-xl shadow-[#FFA07A]/20 transition-all hover:scale-[1.02] border-none"
                                onClick={() => {
                                    // Handle analysis logic here
                                    alert("Analyzing meal...");
                                }}
                            >
                                <Check className="mr-2 w-5 h-5" /> Analyze Meal
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
                                <Camera className="mr-2 w-5 h-5" /> Open Camera
                            </Button>

                            <div className="relative flex items-center py-2 px-2">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">OR</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-[2rem] text-lg font-bold border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm"
                                onClick={() => navigate("/log-meal")}
                            >
                                <Edit3 className="mr-2 w-5 h-5" /> Add Meal Manually
                            </Button>
                        </>
                    )}
                </div>

                {!capturedImage && (
                    <p className="text-[10px] text-gray-400 max-w-xs pt-4 font-medium">
                        * Camera results are AI-based estimates and can be edited anytime.
                    </p>
                )}
            </div>
        </div>
    );
}
