/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';

// Create an Axios instance with a base URL
const HttpClient = axios.create({
    baseURL: '/api',  // Base URL for the API
});

// Request interceptor to add the access token to headers
HttpClient.interceptors.request.use(
    async config => {
        // Retrieve the access token from localStorage
        const token = localStorage.getItem('accessToken');
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;  // Return the modified config
    },
    error => {
        // If an error occurs during the request setup, reject the promise
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration and refreshing
HttpClient.interceptors.response.use(
    response => {
        // If the response is successful, simply return it
        return response;
    },
    async error => {
        const originalRequest = error.config;  // Save the original request configuration
        //  TODO: need to implement in backend
        // If the error status is 401 (Unauthorized) and the request has not been retried yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // Mark the request as retried
            try {
                // Retrieve the refresh token from localStorage
                const refreshToken = localStorage.getItem('refreshToken');
                // Make a request to the token refresh endpoint with the refresh token
                const response = await axios.post('/api/auth/token', { token: refreshToken });

                // Save the new access token in localStorage
                localStorage.setItem('accessToken', response.data.accessToken);
                // Update the default Authorization header with the new access token
                HttpClient.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;

                // Retry the original request with the new access token
                return HttpClient(originalRequest);
            } catch (err) {
                // If the refresh token is expired or invalid, remove the tokens from localStorage and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';  // Redirect to the login page
                return Promise.reject(err);  // Reject the promise with the error
            }
        }

        // If the error is not a 401 or the request has already been retried, reject the promise with the error
        return Promise.reject(error);
    }
);

export default HttpClient;
