import axios from 'axios';

// Browser calls stay same-origin (e.g. Vercel → /api/... → Railway via vercel.json rewrite, or
// CRA dev server proxy) so CORS is not required on the backend for the frontend origin.
// Set REACT_APP_API_URL to the full Railway API URL only if you fix CORS on the backend instead.
const API_BASE_URL =
    process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        // Add any auth tokens here in future
        const user = localStorage.getItem('user');
        if (user) {
           // config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;