import { api } from '../lib/api';

export const authService = {
    // This could optionally hit the /api/profile endpoint to create the record 
    // or just ensure the session is valid
    syncUser: async () => {
        const response = await api.get('/api/profile');
        return response.data;
    }
};
