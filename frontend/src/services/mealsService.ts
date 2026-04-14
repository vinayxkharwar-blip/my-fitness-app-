import { api } from '../lib/api';

export const mealsService = {
    getMeals: async () => {
        const response = await api.get('/api/meals');
        return response.data;
    },
    addMeal: async (mealData: unknown) => {
        const response = await api.post('/api/meals/add', mealData);
        return response.data;
    }
};
