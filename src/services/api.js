import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

let toastId = null;

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 403) {
    const token = localStorage.getItem('token');
    if (!toast.isActive(toastId)) {
      if (token) {
        toastId = toast.error('Yetkisiz işlem lütfen Yetkiliniz ile iletişime geçiniz');
      } else {
        toastId = toast.error('Lütfen giriş yapınız');
      }
    }
  }
  return Promise.reject(error);
});

export const getLabels = () => api.get('/labels');
export const getLabelById = (id) => api.get(`/labels/${id}`);
export const addLabel = (label) => api.post('/labels', label);
export const updateLabel = (label) => api.put('/labels', label);
export const deleteLabel = (id) => api.delete(`/labels/${id}`);
export const getAllLabelsByTaskId = (id) => api.get(`/labels/getAllLabelsByTaskId/${id}`);

export const getAllTasksByLabelId = (labelId) => api.get(`/tasks/labels/${labelId}`);
export const getTasks = () => api.get('/tasks');
export const getTaskById = (id) => api.get(`/tasks/${id}`);
export const addTask = (task) => api.post('/tasks', task);
export const updateTask = (task) => api.put('/tasks', task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const addLabelToTask = (taskId, labelId) => api.post(`/tasks/${taskId}/labels/${labelId}`);

export const registerUser = (user) => api.post('/register', user);
export const loginUser = (credentials) => api.post('/login', credentials, { responseType: 'text' });
