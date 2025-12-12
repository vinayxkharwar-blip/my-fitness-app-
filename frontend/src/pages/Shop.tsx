import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopProductCard } from "@/components/fit/ShopProductCard";
import { BottomNav } from "@/components/fit/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const products = [
  {
    id: "1",
    name: "Premium Whey Protein - Vanilla",
    price: 49,
    originalPrice: 59,
    tag: "Best Seller",
    recommended: true,
  },
  {
    id: "2",
    name: "Daily Multivitamin Complex",
    price: 24,
    recommended: true,
  },
  {
    id: "3",
    name: "Omega-3 Fish Oil Capsules",
    price: 19,
    originalPrice: 25,
    tag: "Sale",
  },
  {
    id: "4",
    name: "Pre-Workout Energy Blend",
    price: 35,
  },
  {
    id: "5",
    name: "BCAA Recovery Formula",
    price: 32,
    recommended: true,
  },
  {
    id: "6",
    name: "Collagen Peptides Powder",
    price: 38,
    originalPrice: 45,
    tag: "New",
  },
];

const Shop = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    toast({
      title: "Added to cart! 🛒",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Shop - FitSnap AI</title>
        <meta
          name="description"
          content="Shop supplements and fitness products recommended for your goals. Quality products to support your fitness journey."
        />
      </Helmet>

      <div className="min-h-screen bg-background pb-24">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/home")}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div>
                <h1 className="text-subtitle text-foreground font-display">Shop</h1>
                <p className="text-small text-muted-foreground">Recommended for your goals</p>
              </div>
            </div>

            <Button variant="outline" size="icon" aria-label="View cart">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Product List */}
        <main className="max-w-lg mx-auto px-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ShopProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Shop;
