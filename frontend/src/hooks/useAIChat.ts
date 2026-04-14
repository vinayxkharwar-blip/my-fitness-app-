import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { chatService } from '../services/chatService';
import { useQuery } from '@tanstack/react-query';

export const useAIChat = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['chatMessages'],
        queryFn: () => chatService.getConversation()
    });

    const sendMessageMutation = useMutation({
        mutationFn: chatService.sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
        },
        onError: () => {
            toast.error("Failed to send message to AI.");
        }
    });

    return {
        messages: query.data || [],
        isLoading: query.isLoading,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending
    };
};
