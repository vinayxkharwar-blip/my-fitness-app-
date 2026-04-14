import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { mealsService } from '../services/mealsService';

export const useMeals = (date?: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['meals', date],
        queryFn: () => mealsService.getMeals()
        // Here we might filter by date if the backend eventually supports it or do via JS map
    });

    const addMutation = useMutation({
        mutationFn: mealsService.addMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meals'] });
            toast.success("Meal logged successfully!");
        },
        onError: () => {
            toast.error("Failed to log meal. Please try again.");
        }
    });

    return {
        meals: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        addMeal: addMutation.mutate,
        isAdding: addMutation.isPending
    };
};
