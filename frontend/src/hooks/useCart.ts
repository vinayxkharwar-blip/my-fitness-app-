import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { shopService } from '../services/shopService';

export const useCart = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['cart'],
        queryFn: () => shopService.getCart()
    });

    const addMutation = useMutation({
        mutationFn: ({ product_id, quantity }: { product_id: number, quantity: number }) =>
            shopService.addToCart(product_id, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success("Added to cart!");
        },
        onError: () => {
            toast.error("Failed to add to cart.");
        }
    });

    const removeMutation = useMutation({
        mutationFn: (cart_id: number) => shopService.removeFromCart(cart_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success("Removed from cart");
        }
    });

    return {
        cart: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        addToCart: addMutation.mutate,
        isAdding: addMutation.isPending,
        removeFromCart: removeMutation.mutate,
        isRemoving: removeMutation.isPending
    };
};
