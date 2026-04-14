import { api } from '../lib/api';

export const nutritionService = {
    analyzeImage: async (image: string) => {
        const response = await api.post('/api/analyze', { image });
        return response.data; // { protein, carbs, fats, calories, foodName }
    },
    calculateNeeds: async (params: unknown) => {
        const response = await api.post('/api/nutrition/calculate', params);
        return response.data;
    }
};
