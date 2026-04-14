import { api } from '../lib/api';

export const chatService = {
    getConversation: async () => {
        const response = await api.get(`/api/chat`);
        return response.data;
    },
    sendMessage: async (messageData: { role: string, content: string }) => {
        const response = await api.post('/api/chat/send', messageData);
        return response.data;
    }
};
