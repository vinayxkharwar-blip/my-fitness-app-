import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadArea } from "@/components/fit/UploadArea";
import { MealResultCard } from "@/components/fit/MealResultCard";
import { LoadingAnalysis } from "@/components/fit/LoadingAnalysis";
import { BottomNav } from "@/components/fit/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

type ViewState = "upload" | "loading" | "result";

const ScanMeal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [viewState, setViewState] = useState<ViewState>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [nutrition, setNutrition] = useState<any>(null);

  const handleUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);

    setViewState("loading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const mlApiUrl =
        import.meta.env.VITE_ML_API_URL || "http://localhost:5001";

      const response = await fetch(`${mlApiUrl}/meal-detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze meal");

      const data = await response.json();
      setNutrition(data.nutrition);
      setViewState("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
      setViewState("upload");
    }
  };

  const handleAddMeal = () => {
    toast({
      title: "Meal added! 🎉",
      description: "Great choice! Your daily progress has been updated.",
    });

    navigate("/scan");
  };

  const defaultNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  };

  return (
    <>
      <Helmet>
        <title>Scan Your Meal - FitSnap AI</title>
        <meta
          name="description"
          content="Take a photo of your meal for instant AI-powered nutrition analysis."
        />
      </Helmet>

      {/* MAIN BACKGROUND */}
      <div
        className="min-h-screen pb-24"
        style={{ backgroundColor: "#12492f" }}
      >
        {/* HEADER */}
        <header
          className="sticky top-0 z-30 backdrop-blur-sm border-b border-white/10"
          style={{ backgroundColor: "#12492f" }}
        >
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
            {/* Back → HOME */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              aria-label="Go back"
              className="text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <h1 className="text-white font-semibold text-lg">
              Scan Meal
            </h1>

            {/* Close → HOME */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              aria-label="Close"
              className="text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-lg mx-auto px-4 pt-6">
          {viewState === "upload" && (
            <UploadArea
              type="meal"
              onUpload={handleUpload}
              onCamera={() => {
                toast({
                  title: "Camera opening...",
                  description: "Take a clear photo of your meal.",
                });
              }}
            />
          )}

          {viewState === "loading" && <LoadingAnalysis type="meal" />}

          {viewState === "result" && (
            <MealResultCard
              mealName="Analyzed Meal"
              imageUrl={uploadedImage || undefined}
              nutrition={nutrition || defaultNutrition}
              onAddMeal={handleAddMeal}
              onEditPortion={() => {
                toast({
                  title: "Edit portion",
                  description: "Portion editor coming soon!",
                });
              }}
            />
          )}
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default ScanMeal;
