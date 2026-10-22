import React, { useState, useRef } from 'react';
import { Camera, Search, Upload, Utensils, CheckCircle2, Loader2, AlertCircle, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tabs';
import { Progress } from '@/components/common/progress';
import { analyzeMeal } from '@/services/api';
import { useMeals } from '@/hooks/useMeals';
import { toast } from 'sonner';

interface AnalysisResult {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    foodName?: string;
}

export default function ScanMeal() {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const { addMeal, isAdding } = useMeals();

    // Convert file to base64 and send to AI
    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.');
            return;
        }

        // Show preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setResult(null);
        setError(null);
        setIsAnalyzing(true);

        try {
            // Convert to base64
            const base64 = await fileToBase64(file);

            // Call backend AI
            const analysis = await analyzeMeal(base64);
            setResult(analysis);
        } catch (err) {
            console.error('Analysis failed:', err);
            setError('AI analysis failed. Please try again.');
            toast.error('Failed to analyze meal image.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleLogMeal = () => {
        if (!result) return;
        addMeal({
            name: result.foodName || 'Scanned Meal',
            calories: result.calories,
            protein: result.protein,
            carbs: result.carbs,
            fats: result.fats,
            meal_type: 'snack',
        });
        // Reset after logging
        setResult(null);
        setPreviewUrl(null);
    };

    // Mock search (search food DB is a future feature)
    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        toast.info('Food database search coming soon! Use the Scan tab to analyze a meal photo.');
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 pb-24 max-w-5xl animate-fade-in">
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
                            {/* Hidden file inputs */}
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileSelect}
                            />

                            {/* Preview or Upload Area */}
                            {previewUrl ? (
                                <div className="relative rounded-2xl overflow-hidden mb-6">
                                    <img
                                        src={previewUrl}
                                        alt="Meal preview"
                                        className="w-full max-h-[400px] object-cover rounded-2xl"
                                    />
                                    {isAnalyzing && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl">
                                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                            <p className="text-white font-semibold text-sm">Analyzing your meal...</p>
                                            <p className="text-white/60 text-xs">AI is estimating nutritional content</p>
                                        </div>
                                    )}
                                    {!isAnalyzing && (
                                        <button
                                            onClick={() => {
                                                setPreviewUrl(null);
                                                setResult(null);
                                                setError(null);
                                            }}
                                            className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-black/70 transition-colors"
                                        >
                                            ✕ Clear
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                                    <Camera className="w-16 h-16 text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Take a Photo of Your Meal</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Our AI will analyze the image and estimate the macronutrients.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button onClick={() => cameraInputRef.current?.click()} className="gap-2">
                                            <Camera className="w-4 h-4" />
                                            Take Photo
                                        </Button>
                                        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload Image
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl mt-4">
                                    <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-destructive">{error}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-1 h-auto p-0 text-xs text-destructive hover:text-destructive/80"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Try another image →
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Re-scan buttons when preview is shown but no result */}
                            {previewUrl && !isAnalyzing && !result && !error && (
                                <div className="flex gap-4 justify-center mt-4">
                                    <Button onClick={() => cameraInputRef.current?.click()} variant="outline" className="gap-2">
                                        <Camera className="w-4 h-4" />
                                        Retake Photo
                                    </Button>
                                    <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload Different
                                    </Button>
                                </div>
                            )}
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
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <Button size="lg" onClick={handleSearch}>Search</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* AI Analysis Results */}
            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-bold">Nutrition Results</h2>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-center text-lg">
                                <span>{result.foodName || 'Detected Meal'}</span>
                                <span className="font-bold text-primary">{result.calories} kcal</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Protein</span>
                                    <span className="text-muted-foreground">{result.protein}g</span>
                                </div>
                                <Progress value={Math.min((result.protein / 50) * 100, 100)} className="h-2 bg-secondary" indicatorClassName="bg-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Carbs</span>
                                    <span className="text-muted-foreground">{result.carbs}g</span>
                                </div>
                                <Progress value={Math.min((result.carbs / 80) * 100, 100)} className="h-2 bg-secondary" indicatorClassName="bg-green-500" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Fats</span>
                                    <span className="text-muted-foreground">{result.fats}g</span>
                                </div>
                                <Progress value={Math.min((result.fats / 40) * 100, 100)} className="h-2 bg-secondary" indicatorClassName="bg-yellow-500" />
                            </div>

                            <Button
                                className="w-full h-12 text-lg gap-2 mt-4"
                                variant="default"
                                onClick={handleLogMeal}
                                disabled={isAdding}
                            >
                                {isAdding ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="w-5 h-5" />
                                )}
                                {isAdding ? 'Logging...' : 'Log This Meal'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
