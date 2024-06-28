/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import { getAccessToken, getRefreshToken, removeUserSession, setUserSession } from './user-session';

// Create an Axios instance with a base URL
const HttpClient = axios.create({
    baseURL: '/api',  // Base URL for the API
});

// Request interceptor to add the access token to headers
HttpClient.interceptors.request.use(
    async config => {
        // Retrieve the access token from localStorage
        const token = getAccessToken();
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;  // Return the modified config
    },
    error => {
        // If an error occurs during the request setup, reject the promise
        const errorResponse:AxiosError = {
            status: 401,
            isAxiosError: true,
            toJSON: function (): object {
                throw new Error('Invalid token');
            },
            name: '',
            message: 'Invalid Token'
        }
        return Promise.reject(errorResponse);
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
        
        // If the error status is 401 (Unauthorized) and the request has not been retried yet
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // Mark the request as retried
            try {
                // Retrieve the refresh token from localStorage
                const refreshToken = getRefreshToken();
                // Make a request to the token refresh endpoint with the refresh token
                const response = await axios.post('/api/auth/token', { token: refreshToken });

                // Save the new access token in localStorage
                setUserSession(response.data);
                // Update the default Authorization header with the new access token
                HttpClient.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;

                // Retry the original request with the new access token
                return HttpClient(originalRequest);
            } catch (err) {
                // If the refresh token is expired or invalid, remove the tokens from localStorage and redirect to login
                removeUserSession()
                window.location.href = '/login';  // Redirect to the login page
                return Promise.reject(err);  // Reject the promise with the error
            }
        }

        // If the error is not a 401 or the request has already been retried, reject the promise with the error
        const errorResponse: AxiosError = {
            status: 401,
            isAxiosError: true,
            toJSON: function (): object {
                throw new Error('Invalid token');
            },
            name: '',
            message: 'Invalid Token'
        }
        return Promise.reject(errorResponse);
    }
);

export default HttpClient;
