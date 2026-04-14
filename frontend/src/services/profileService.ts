import { api } from '../lib/api';

export const profileService = {
    getProfile: async () => {
        const response = await api.get('/api/profile');
        return response.data;
    },
    updateProfile: async (profileData: unknown) => {
        const response = await api.post('/api/profile/update', profileData);
        return response.data;
    }
};
