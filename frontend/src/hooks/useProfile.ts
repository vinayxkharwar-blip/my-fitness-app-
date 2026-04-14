import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { profileService } from '../services/profileService';

export const useProfile = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getProfile()
    });

    const updateMutation = useMutation({
        mutationFn: profileService.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success("Profile updated successfully!");
        },
        onError: () => {
            toast.error("Failed to update profile. Please try again.");
        }
    });

    return {
        profile: query.data,
        isLoading: query.isLoading,
        error: query.error,
        updateProfile: updateMutation.mutate,
        isUpdating: updateMutation.isPending
    };
};
