import React, { useState, useMemo } from 'react';
import { ShoppingBag, ShoppingCart, Star, Filter, Loader2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Badge } from '@/components/common/badge';
import { useQuery } from '@tanstack/react-query';
import { shopService } from '@/services/shopService';
import { useCart } from '@/hooks/useCart';

type Category = 'All' | 'Supplements' | 'Equipment' | 'Apparel';

const CATEGORIES: Category[] = ['All', 'Supplements', 'Equipment', 'Apparel'];

// Fallback rating when DB doesn't store ratings
const DEFAULT_RATING = 4.7;

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');

    // Fetch products from backend
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => shopService.getProducts(),
    });

    // Fetch cart from backend
    const { cart, addToCart, isAdding } = useCart();
    const cartCount = Array.isArray(cart) ? cart.length : 0;

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All') return products;
        return products.filter((p: any) => p.category === selectedCategory);
    }, [products, selectedCategory]);

    const handleAddToCart = (productId: number) => {
        addToCart({ product_id: productId, quantity: 1 });
    };

    // ── Loading State ──
    if (isLoading) {
        return (
            <div className="container mx-auto p-4 pb-24 max-w-7xl flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-muted-foreground text-sm font-medium">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 pb-24 max-w-7xl animate-fade-in">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <ShoppingBag className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Fitness Shop</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Premium gear and supplements to fuel your progress.
                    </p>
                </div>
                <Button variant="outline" className="relative h-12 w-12 rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-primary text-primary-foreground border-2 border-background">
                            {cartCount}
                        </Badge>
                    )}
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                <Filter className="w-5 h-5 mr-2 text-muted-foreground" />
                {CATEGORIES.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category)}
                        className="rounded-full"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product: any) => (
                        <Card key={product.product_id} className="overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
                            <div className="relative aspect-square overflow-hidden bg-muted">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                />
                                <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur-sm">
                                    {product.category}
                                </Badge>
                            </div>
                            <CardHeader className="p-4 pb-0">
                                <div className="flex justify-between items-start gap-4">
                                    <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
                                    <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded text-sm font-medium">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        {product.rating || DEFAULT_RATING}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2 flex-grow">
                                <div className="text-2xl font-bold text-primary">
                                    ${Number(product.price).toFixed(2)}
                                </div>
                                {product.description && (
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                                )}
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button
                                    className="w-full gap-2"
                                    onClick={() => handleAddToCart(product.product_id)}
                                    disabled={isAdding || product.stock === 0}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 flex flex-col items-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground">Try selecting a different category.</p>
                </div>
            )}
        </div>
    );
}
