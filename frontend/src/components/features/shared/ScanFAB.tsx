import { Camera } from "lucide-react";
import { Button } from "@/components/common/button";

interface ScanFABProps {
  onClick?: () => void;
  visible?: boolean;
}

export function ScanFAB({ onClick, visible = true }: ScanFABProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center">
      <Button
        variant="fab"
        size="fab"
        onClick={onClick}
        className="relative h-16 w-16 rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 border-4 border-white hover:opacity-90 transition-opacity duration-300"
        aria-label="Scan my meal"
      >
        <Camera className="w-7 h-7 text-white drop-shadow-sm" aria-hidden="true" />
      </Button>
    </div>
  );
}
