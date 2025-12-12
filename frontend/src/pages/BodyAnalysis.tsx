import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadArea } from "@/components/fit/UploadArea";
import { BodyAnalysisCard } from "@/components/fit/BodyAnalysisCard";
import { LoadingAnalysis } from "@/components/fit/LoadingAnalysis";
import { BottomNav } from "@/components/fit/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

type ViewState = "upload" | "loading" | "result";

const BodyAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewState, setViewState] = useState<ViewState>("upload");

  const [result, setResult] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setViewState("loading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const mlApiUrl = import.meta.env.VITE_ML_API_URL || "http://localhost:5001";
      const response = await fetch(`${mlApiUrl}/body-fat`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze body fat");

      const data = await response.json();
      setResult(data);
      setViewState("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
      setViewState("upload");
    }
  };

  const defaultResult = {
    bodyFatPercentage: 0,
    category: "Unknown",
    recommendation: "Please try again.",
  };

  return (
    <>
      <Helmet>
        <title>Body Analysis - FitSnap AI</title>
        <meta name="description" content="Get an AI-powered body composition estimate. Upload a photo to receive personalized diet and fitness recommendations." />
      </Helmet>

      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-subtitle text-foreground font-display">Body Analysis</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 pt-6">
          {viewState === "upload" && (
            <UploadArea
              type="body"
              onUpload={handleUpload}
              onCamera={() => {
                toast({
                  title: "Camera opening...",
                  description: "Stand straight and take a clear front-facing photo",
                });
              }}
            />
          )}

          {viewState === "loading" && (
            <LoadingAnalysis type="body" />
          )}

          {viewState === "result" && (
            <BodyAnalysisCard
              result={result || defaultResult}
              onGenerateDietPlan={() => {
                toast({
                  title: "Generating your plan...",
                  description: "We're creating a personalized diet plan for you!",
                });
                navigate('/plans');
              }}
              onTalkToCoach={() => navigate('/coach')}
            />
          )}
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default BodyAnalysis;
