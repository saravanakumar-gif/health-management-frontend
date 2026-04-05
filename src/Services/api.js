import axios from 'axios';

/**
 * Use same-origin `/api` when the env URL points at another host (e.g. Railway). That avoids CORS
 * because Vercel rewrites `/api/*` → Railway (see vercel.json) and CRA `proxy` does the same in dev.
 * If REACT_APP_API_URL is set on Vercel to the full Railway URL, it would otherwise be baked into
 * the bundle and the browser would still hit Railway directly → CORS errors.
 */
function resolveApiBaseUrl() {
    const fromEnv = process.env.REACT_APP_API_URL;
    if (!fromEnv || fromEnv === '/api') {
        return '/api';
    }
    if (fromEnv.startsWith('/')) {
        return fromEnv;
    }
    if (typeof window !== 'undefined') {
        try {
            const parsed = new URL(fromEnv);
            if (parsed.origin === window.location.origin) {
                return fromEnv;
            }
        } catch {
            return '/api';
        }
    }
    return '/api';
}

const api = axios.create({
    baseURL: resolveApiBaseUrl(),
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