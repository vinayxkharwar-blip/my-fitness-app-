import { api } from '../lib/api';

export const trainersService = {
    getTrainers: async () => {
        const response = await api.get('/api/trainers');
        return response.data;
    },
    getTrainerDetails: async (trainer_id: number) => {
        const response = await api.get(`/api/trainers/${trainer_id}`);
        return response.data;
    },
    createBooking: async (bookingData: unknown) => {
        const response = await api.post('/api/bookings/create', bookingData);
        return response.data;
    },
    getUserBookings: async () => {
        const response = await api.get('/api/bookings');
        return response.data;
    }
};
