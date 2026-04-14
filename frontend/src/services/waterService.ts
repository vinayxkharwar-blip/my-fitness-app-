import { api } from '../lib/api';

export const waterService = {
    getWaterLogs: async () => {
        const response = await api.get('/api/water');
        return response.data;
    },
    addWaterLog: async (amount_ml: number) => {
        const response = await api.post('/api/water/add', { amount_ml });
        return response.data;
    }
};
