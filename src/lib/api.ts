import axios from 'axios';
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const api = axios.create({ baseURL: API_BASE, withCredentials: false });
api.interceptors.request.use(cfg => {
const token = localStorage.getItem('auth_token');
if (token) cfg.headers.Authorization = `Bearer ${token}`;
return cfg;
});

// ---- Admin
export const fetchAdminState = async () => (await api.get('/admin/state')).data as { mode: string };
export const setAdminMode = async (mode: string) => (await api.post('/admin/mode', { mode })).data;

// ---- Scoreboard
export const fetchScoreOverview = async () => (await api.get('/scoreboard/overview')).data;

// ---- VMs
export const fetchVMs = async () => (await api.get('/vms')).data;
export const vmAction = async (vmId: string, action: 'start'|'stop'|'reset'|'snapshot'|'clone') => (
await api.post(`/vms/${vmId}/action`, { action })
).data;

// ---- Labs
export const login = async (credentials: { email: string; password: string }) => (
  await api.post('/auth/login', credentials)
).data as { token: string; user: { name: string; rank: string; role: string; unit: string; email: string } };

export const fetchLabs = async () => (await api.get('/labs')).data;
export const fetchLabVMs = async (labId: string) => (await api.get(`/labs/${labId}/vms`)).data;