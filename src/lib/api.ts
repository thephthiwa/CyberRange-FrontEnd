import axios from 'axios';
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const api = axios.create({ baseURL: API_BASE, withCredentials: false });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('auth_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
