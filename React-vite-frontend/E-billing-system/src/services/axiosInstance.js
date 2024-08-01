import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
 // baseURL: 'http://localhost:8080',
});
// http://192.168.0.102:8080/users/login
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
