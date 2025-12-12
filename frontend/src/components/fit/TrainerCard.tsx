import { Star, MessageCircle, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainerCardProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  imageUrl?: string;
  available?: boolean;
  onViewProfile?: (id: string) => void;
  onChat?: (id: string) => void;
  onCall?: (id: string) => void;
  onBook?: (id: string) => void;
}

export function TrainerCard({
  id,
  name,
  specialty,
  rating,
  reviewCount,
  pricePerSession,
  imageUrl,
  available = true,
  onViewProfile,
  onChat,
  onCall,
  onBook,
}: TrainerCardProps) {
  return (
    <div className="fit-card-elevated space-y-4 animate-slide-up">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${name}, fitness coach`}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-title font-display text-primary">
                {name.charAt(0)}
              </span>
            </div>
          )}
          {available && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-subtitle text-foreground truncate">{name}</h3>
          <p className="text-small text-muted-foreground">{specialty}</p>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" aria-hidden="true" />
              <span className="text-small font-medium text-foreground">{rating}</span>
              <span className="text-tiny text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="text-small text-primary font-medium">
              ${pricePerSession}/session
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="primary-pill"
          size="default"
          onClick={() => onBook?.(id)}
          className="flex-1"
          aria-label={`Book a session with ${name}`}
        >
          <Calendar className="w-4 h-4" />
          Book
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onChat?.(id)}
          aria-label={`Chat with ${name}`}
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCall?.(id)}
          aria-label={`Call ${name}`}
        >
          <Phone className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
