import api from './api';

const authService = {
    login: async (credentials) => {
        const  response = await api.get('/patients');
        return { success: true, user: { name: 'User' } };
    },

    register: async (userData) => {
        const response = await api.post('/patients', userData);
        return response.data;
    },
};

export default authService;