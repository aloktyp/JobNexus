import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    withCredentials: true, // Always send cookies
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        console.log('Making request to:', config.url);
        console.log('Token from localStorage:', token ? 'Present' : 'Not found');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Added Authorization header');
        }
        
        // Ensure credentials are always sent
        config.withCredentials = true;
        
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            console.log('401 error - clearing token');
            // Token expired or invalid, remove from localStorage
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;