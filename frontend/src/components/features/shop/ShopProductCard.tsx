import { ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/common/button";

interface ShopProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  tag?: string;
  recommended?: boolean;
  onAddToCart?: (id: string) => void;
}

export function ShopProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  tag,
  recommended = false,
  onAddToCart,
}: ShopProductCardProps) {
  return (
    <div className="fit-card overflow-hidden animate-slide-up">
      {/* Image */}
      <div className="relative -mx-4 -mt-4 mb-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-36 object-cover"
          />
        ) : (
          <div className="w-full h-36 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground/30" aria-hidden="true" />
          </div>
        )}
        
        {tag && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-accent text-accent-foreground text-tiny font-medium flex items-center gap-1">
            <Tag className="w-3 h-3" aria-hidden="true" />
            {tag}
          </div>
        )}
        
        {recommended && (
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-tiny font-medium">
            For You
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="text-body-medium text-foreground line-clamp-2">{name}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-subtitle text-primary font-display">${price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-small text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {recommended && (
          <p className="text-tiny text-muted-foreground">
            Recommended for your goals
          </p>
        )}
      </div>

      {/* Add to Cart */}
      <Button
        variant="primary-pill"
        size="sm"
        onClick={() => onAddToCart?.(id)}
        className="w-full mt-3"
        aria-label={`Add ${name} to cart`}
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </Button>
    </div>
  );
}
