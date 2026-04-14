import React, { useState } from 'react';
import { Activity, Scale, Percent, Dumbbell, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Progress } from '@/components/common/progress';

export default function BodyAnalysis() {
    const [weight, setWeight] = useState('');
    const [bodyFat, setBodyFat] = useState('');

    // Mock Data
    const currentStats = {
        weight: '75.5',
        bmi: '23.8',
        bodyFat: '18',
        muscleMass: '32.1',
    };

    const goals = {
        targetWeight: 72,
        currentWeight: 75.5,
        startWeight: 80,
    };

    // Calculate progress percentage
    const totalWeightToLose = goals.startWeight - goals.targetWeight;
    const weightLostSoFar = goals.startWeight - goals.currentWeight;
    const progressPercentage = Math.max(0, Math.min(100, (weightLostSoFar / totalWeightToLose) * 100));

    const handleLogsubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send to backend 
        console.log({ weight, bodyFat });
        setWeight('');
        setBodyFat('');
    };

    return (
        <div className="container mx-auto p-4 pb-24 max-w-6xl animate-fade-in">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Activity className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Body Analysis</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Track your measurements and visualize your progress over time.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Scale className="w-4 h-4" />
                            <h3 className="text-sm font-medium">Weight</h3>
                        </div>
                        <div className="text-3xl font-bold">
                            {currentStats.weight} <span className="text-lg text-muted-foreground font-normal">kg</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Activity className="w-4 h-4" />
                            <h3 className="text-sm font-medium">BMI</h3>
                        </div>
                        <div className="text-3xl font-bold">
                            {currentStats.bmi}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Percent className="w-4 h-4" />
                            <h3 className="text-sm font-medium">Body Fat</h3>
                        </div>
                        <div className="text-3xl font-bold">
                            {currentStats.bodyFat} <span className="text-lg text-muted-foreground font-normal">%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Dumbbell className="w-4 h-4" />
                            <h3 className="text-sm font-medium">Muscle Mass</h3>
                        </div>
                        <div className="text-3xl font-bold">
                            {currentStats.muscleMass} <span className="text-lg text-muted-foreground font-normal">kg</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Chart & Goals */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Chart Area */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Weight Tracking</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center bg-muted/30 ml-6 mr-6 mb-6 rounded-lg border border-dashed border-border">
                            <div className="text-center text-muted-foreground">
                                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>Chart Visualization Area</p>
                                <p className="text-sm">Connect a charting library like Recharts here</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Goals Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Flag className="w-5 h-5 text-primary" />
                                Current Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-muted-foreground">Start: {goals.startWeight}kg</span>
                                    <span className="font-bold">Current: {goals.currentWeight}kg</span>
                                    <span className="font-medium text-emerald-600">Target: {goals.targetWeight}kg</span>
                                </div>
                                <Progress value={progressPercentage} className="h-3" />
                                <p className="text-sm text-center text-muted-foreground pt-1">
                                    {Math.round(progressPercentage)}% completed
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Log form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Log Measurement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogsubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Weight (kg)</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        placeholder="E.g., 75.5"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Body Fat % (Optional)</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        placeholder="E.g., 18.5"
                                        value={bodyFat}
                                        onChange={(e) => setBodyFat(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date</label>
                                    <Input
                                        type="date"
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Notes (Optional)</label>
                                    <Input
                                        type="text"
                                        placeholder="Felt good today..."
                                    />
                                </div>
                                <Button type="submit" className="w-full mt-4">Save Entry</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
