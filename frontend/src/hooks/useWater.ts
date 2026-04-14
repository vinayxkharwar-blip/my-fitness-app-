import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { waterService } from '../services/waterService';

export const useWater = (date?: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['waterLogs', date],
        queryFn: () => waterService.getWaterLogs()
    });

    const addMutation = useMutation({
        mutationFn: waterService.addWaterLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['waterLogs'] });
            toast.success("Water intake logged successfully!");
        },
        onError: () => {
            toast.error("Failed to log water intake. Please try again.");
        }
    });

    return {
        waterLogs: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        addWater: addMutation.mutate,
        isAdding: addMutation.isPending
    };
};
