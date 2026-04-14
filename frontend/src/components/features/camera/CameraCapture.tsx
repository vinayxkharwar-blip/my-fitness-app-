import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/common/button";
import { X, RefreshCw, Image as ImageIcon } from "lucide-react";

interface CameraCaptureProps {
    onCapture: (imageDataUrl: string) => void;
    onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

    const startCamera = async () => {
        setLoading(true);
        setError(null);
        try {
            stopCamera(); // Ensure previous stream is stopped
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Could not access camera. Please allow camera permissions.");
        } finally {
            setLoading(false);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Flip horizontally if using front camera
                if (facingMode === 'user') {
                    context.translate(canvas.width, 0);
                    context.scale(-1, 1);
                }

                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                onCapture(dataUrl);
                stopCamera();
            }
        }
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    };

    const handleGalleryClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                onCapture(dataUrl);
                stopCamera(); // Stop camera when file is selected
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-end bg-gradient-to-b from-black/50 to-transparent">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
                    <X size={24} />
                </Button>
            </div>

            {error ? (
                <div className="text-white text-center p-6">
                    <p className="mb-4 text-red-400">{error}</p>
                    <Button onClick={startCamera} variant="outline" className="border-white text-white hover:bg-white/20">
                        Try Again
                    </Button>
                </div>
            ) : (
                <div className="relative w-full h-full flex flex-col">
                    <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                        {loading && <div className="text-white animate-pulse">Starting camera...</div>}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className={`absolute min-w-full min-h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                        />
                    </div>

                    {/* Bottom Controls */}
                    <div className="bg-black/80 p-8 pb-12 flex justify-around items-center gap-8">

                        {/* Gallery Button (Left) */}
                        <div className="flex flex-col items-center gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-14 w-14 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
                                onClick={handleGalleryClick}
                            >
                                <ImageIcon size={24} />
                            </Button>
                            <span className="text-[10px] text-white/70 font-medium">Gallery</span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Shutter Button (Center) */}
                        <button
                            onClick={takePhoto}
                            className="h-20 w-20 rounded-full border-4 border-white bg-transparent flex items-center justify-center p-1 active:scale-95 transition-transform shadow-lg shadow-white/10"
                        >
                            <div className="w-full h-full bg-white rounded-full"></div>
                        </button>

                        {/* Rotate Button (Right) */}
                        <div className="flex flex-col items-center gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-14 w-14 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
                                onClick={toggleCamera}
                            >
                                <RefreshCw size={24} />
                            </Button>
                            <span className="text-[10px] text-white/70 font-medium">Flip</span>
                        </div>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
