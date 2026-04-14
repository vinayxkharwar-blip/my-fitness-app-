import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { trainersService } from '../services/trainersService';

export const useBookings = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['bookings'],
        queryFn: () => trainersService.getUserBookings()
    });

    const addMutation = useMutation({
        mutationFn: trainersService.createBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            toast.success("Booking created successfully!");
        },
        onError: () => {
            toast.error("Failed to create booking. Please try again.");
        }
    });

    return {
        bookings: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        createBooking: addMutation.mutate,
        isCreating: addMutation.isPending
    };
};
