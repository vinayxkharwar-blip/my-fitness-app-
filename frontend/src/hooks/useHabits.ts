import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { habitsService } from '../services/habitsService';

export const useHabits = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['habitLogs'],
        queryFn: () => habitsService.getHabitLogs()
    });

    const addMutation = useMutation({
        mutationFn: habitsService.addHabitLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habitLogs'] });
            toast.success("Habit recorded successfully!");
        }
    });

    return {
        habitLogs: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        addHabitLog: addMutation.mutate,
        isAdding: addMutation.isPending
    };
};
