import { useState, useCallback } from "react";
import { Upload, Camera, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadAreaProps {
  type: "meal" | "body";
  onUpload?: (file: File) => void;
  onCamera?: () => void;
}

export function UploadArea({ type, onUpload, onCamera }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const instructions = type === "meal"
    ? "Take a photo of your meal for instant nutrition analysis"
    : "Upload one clear front photo. This is an estimate only 😊";

  const handleFile = useCallback((file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onUpload?.(file);
    }
  }, [onUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);



  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Instructions */}
      <p className="text-center text-body text-muted-foreground px-4">
        {instructions}
      </p>

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 transition-all duration-300 ${isDragging
          ? 'border-primary bg-primary/5 scale-[1.02]'
          : 'border-border hover:border-primary/50 bg-muted/30'
          }`}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview of uploaded image"
              className="w-full h-48 object-cover rounded-2xl"
            />
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-card/90 hover:bg-card text-muted-foreground"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8">
            {type === "body" ? (
              <div className="w-24 h-32 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <div className="w-8 h-20 rounded-full border-2 border-muted-foreground/30" />
              </div>
            ) : (
              <div className="p-4 rounded-full bg-muted">
                <Image className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
              </div>
            )}
            <div className="text-center">
              <p className="text-body-medium text-foreground mb-1">
                Drag & drop your photo here
              </p>
              <p className="text-small text-muted-foreground">
                or use the buttons below
              </p>
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload image file"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="primary-pill"
          size="lg"
          onClick={onCamera}
          className="flex-1"
          aria-label="Take a photo with camera"
        >
          <Camera className="w-5 h-5" />
          Take Photo
        </Button>
        <label className="flex-1">
          <Button
            variant="outline"
            size="lg"
            className="w-full pointer-events-none"
            aria-label="Upload from gallery"
          >
            <Upload className="w-5 h-5" />
            Gallery
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}
