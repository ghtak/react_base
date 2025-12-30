import axios, { type AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized');
    } else {
      return Promise.reject(error);
    }
  },
);

export default client;
