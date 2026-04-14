import { api } from '../lib/api';

export const habitsService = {
    getHabitLogs: async () => {
        const response = await api.get('/api/habits');
        return response.data;
    },
    addHabitLog: async (habit_id: number) => {
        const response = await api.post('/api/habits/add', { habit_id });
        return response.data;
    }
};
