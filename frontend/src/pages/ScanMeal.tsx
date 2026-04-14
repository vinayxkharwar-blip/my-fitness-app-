import React, { useState } from 'react';
import { Camera, Search, Upload, Utensils, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tabs';
import { Progress } from '@/components/common/progress';

export default function ScanMeal() {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasResults, setHasResults] = useState(false);

    // Mock functionality to show results
    const handleAction = () => {
        setHasResults(true);
    };

    return (
        <div className="container mx-auto p-4 pb-24 max-w-3xl animate-fade-in">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Utensils className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Log Meal</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Track your nutrition by scanning a photo or searching our database.
                </p>
            </div>

            <Tabs defaultValue="scan" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="scan">Scan Food</TabsTrigger>
                    <TabsTrigger value="search">Search Food</TabsTrigger>
                </TabsList>

                <TabsContent value="scan">
                    <Card>
                        <CardContent className="p-8">
                            <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                                <Camera className="w-16 h-16 text-muted-foreground mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Take a Photo of Your Meal</h3>
                                <p className="text-muted-foreground mb-6">
                                    Our AI will analyze the image and estimate the macronutrients.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button onClick={handleAction} className="gap-2">
                                        <Camera className="w-4 h-4" />
                                        Take Photo
                                    </Button>
                                    <Button variant="outline" onClick={handleAction} className="gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload Image
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="search">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex gap-2">
                                <div className="relative flex-grow">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        placeholder="Search for a food item..."
                                        className="pl-10 h-12 text-lg"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                                    />
                                </div>
                                <Button size="lg" onClick={handleAction}>Search</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {hasResults && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-bold">Nutrition Results</h2>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-center text-lg">
                                <span>Grilled Chicken Salad (Estimated)</span>
                                <span className="font-bold text-primary">450 kcal</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Protein</span>
                                    <span className="text-muted-foreground">42g</span>
                                </div>
                                <Progress value={70} className="h-2 bg-secondary" indicatorClassName="bg-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Carbs</span>
                                    <span className="text-muted-foreground">25g</span>
                                </div>
                                <Progress value={30} className="h-2 bg-secondary" indicatorClassName="bg-green-500" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Fats</span>
                                    <span className="text-muted-foreground">18g</span>
                                </div>
                                <Progress value={45} className="h-2 bg-secondary" indicatorClassName="bg-yellow-500" />
                            </div>

                            <Button className="w-full h-12 text-lg gap-2 mt-4" variant="default">
                                <CheckCircle2 className="w-5 h-5" />
                                Log This Meal
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
