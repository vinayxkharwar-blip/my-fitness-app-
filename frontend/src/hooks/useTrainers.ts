import { useQuery } from '@tanstack/react-query';
import { trainersService } from '../services/trainersService';

export const useTrainers = () => {
    const query = useQuery({
        queryKey: ['trainers'],
        queryFn: () => trainersService.getTrainers()
    });

    return {
        trainers: query.data || [],
        isLoading: query.isLoading,
        error: query.error
    };
};
