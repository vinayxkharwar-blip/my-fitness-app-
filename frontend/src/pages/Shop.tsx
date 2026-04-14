import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Badge } from '@/components/common/badge';

type Category = 'All' | 'Supplements' | 'Equipment' | 'Apparel';

interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    category: Category;
    image: string;
}

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Whey Protein Isolate',
        price: 49.99,
        rating: 4.8,
        category: 'Supplements',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '2',
        name: 'Pre-Workout Energy',
        price: 34.99,
        rating: 4.6,
        category: 'Supplements',
        image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '3',
        name: 'Adjustable Dumbbells',
        price: 199.99,
        rating: 4.9,
        category: 'Equipment',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '4',
        name: 'Resistance Bands Set',
        price: 24.99,
        rating: 4.5,
        category: 'Equipment',
        image: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '5',
        name: 'Performance T-Shirt',
        price: 29.99,
        rating: 4.7,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '6',
        name: 'Gym Duffle Bag',
        price: 45.00,
        rating: 4.4,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500',
    },
];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');
    const [cartCount, setCartCount] = useState(0);

    const filteredProducts = selectedCategory === 'All'
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

    const categories: Category[] = ['All', 'Supplements', 'Equipment', 'Apparel'];

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
    };

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
                {categories.map((category) => (
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
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
                            <div className="relative aspect-square overflow-hidden bg-muted">
                                <img
                                    src={product.image}
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
                                        {product.rating}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2 flex-grow">
                                <div className="text-2xl font-bold text-primary">
                                    ${product.price.toFixed(2)}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full gap-2" onClick={handleAddToCart}>
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
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
