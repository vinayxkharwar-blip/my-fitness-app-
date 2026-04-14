import { api } from '../lib/api';

export const shopService = {
    getProducts: async () => {
        const response = await api.get('/api/products');
        return response.data;
    },
    getProductById: async (product_id: number) => {
        const response = await api.get(`/api/products/${product_id}`);
        return response.data;
    },
    getCart: async () => {
        const response = await api.get('/api/cart');
        return response.data;
    },
    addToCart: async (product_id: number, quantity: number) => {
        const response = await api.post('/api/cart/add', { product_id, quantity });
        return response.data;
    },
    removeFromCart: async (cart_id: number) => {
        const response = await api.delete(`/api/cart/remove/${cart_id}`);
        return response.data;
    }
};
