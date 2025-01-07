import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Pour envoyer les cookies authentification
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default axiosInstance;
