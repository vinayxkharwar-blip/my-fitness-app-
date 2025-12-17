import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanMeal() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = () => {
      navigate("/home", { replace: true });
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  const openCamera = () => {
    fileInputRef.current.click();
  };

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Captured Image:", file);
      // 👉 yahan AI / API call
    }
  };

  return (
    <div className="min-h-screen w-full bg-background pb-24 text-foreground p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        <div className="h-32 w-32 rounded-full bg-card border-4 border-dashed border-white/20 flex items-center justify-center text-zinc-500 mb-4">
          <Camera size={40} className="opacity-50" />
        </div>

        <h1 className="text-3xl font-bold">Snap Your Meal</h1>

        <p className="text-muted-foreground text-lg">
          Point your camera at food to get instant calorie and macro breakdown using AI.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageCapture}
        />

        <Button
          onClick={openCamera}
          className="w-full h-14 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 mt-4"
        >
          <Camera className="mr-2" /> Open Camera
        </Button>
      </div>
    </div>
  );
}
