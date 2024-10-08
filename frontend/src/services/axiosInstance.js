import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://auth-auto-logout.vercel.app/api/auth', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

export default axiosInstance;