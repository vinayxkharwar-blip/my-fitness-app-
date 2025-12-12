import React, { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Trainer {
    id: number;
    name: string;
    speciality: string;
}

const Trainers = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const data = await apiRequest("/trainers");
                setTrainers(data);
            } catch (error) {
                console.error("Failed to fetch trainers", error);
                toast.error("Could not load trainers.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading trainers...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Our Trainers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                    <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${trainer.name}`} alt={trainer.name} />
                                <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{trainer.name}</CardTitle>
                                <CardDescription>{trainer.speciality}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Ready to help you achieve your fitness goals with expert guidance in {trainer.speciality}.
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Trainers;
