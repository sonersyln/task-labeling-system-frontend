import axios from "axios";
import { toast } from "react-toastify";


const API_BASE_URL = 'http://localhost:8080/api';


const instance = axios.create({
  baseURL: `${API_BASE_URL}`
});

instance.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.error('User not found in localStorage.');
      if (!toast.isActive('loginToast')) {
        toast.error('Lütfen giriş yapınız.', { toastId: 'loginToast' });
      }
      return Promise.reject('User not found in localStorage');
    }

    if (!user.data.authorities) {
      console.error('User does not have authorities field.');
      if (!toast.isActive('loginToast')) {
        toast.error('Lütfen giriş yapınız.', { toastId: 'loginToast' });
      }
      return Promise.reject('User does not have authorities field');
    }

    if (user.data.authorities.includes('ROLE_ADMIN') || user.data.authorities.includes('ROLE_USER')) {
      return config;
    } else {
      console.error('User does not have necessary permissions.');
      if (!toast.isActive('loginToast')) {
        toast.error('Lütfen giriş yapınız.', { toastId: 'loginToast' });
      }
      return Promise.reject('User does not have necessary permissions');
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export const getLabels = () => instance.get(`/labels`);
export const getLabelById = (id) => instance.get(`${API_BASE_URL}/labels/${id}`);
export const addLabel = (label) => instance.post(`${API_BASE_URL}/labels`, label);
export const updateLabel = (label) => instance.put(`${API_BASE_URL}/labels`, label);
export const deleteLabel = (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.data.authorities.includes('ROLE_ADMIN')) {
    return instance.delete(`${API_BASE_URL}/labels/${id}`);
  } else {
    toast.error('Sadece yöneticiler etiketleri silebilir.');
    return Promise.reject('Only admins can delete labels');
  }
};
export const getAllLabelsByTaskId = (id) => instance.get(`${API_BASE_URL}/labels/getAllLabelsByTaskId/${id}`);

export const getAllTasksByLabelId = (labelId) => instance.get(`${API_BASE_URL}/tasks/labels/${labelId}`);
export const getTasks = () => instance.get(`${API_BASE_URL}/tasks`);
export const getTaskById = (id) => instance.get(`${API_BASE_URL}/tasks/${id}`);
export const addTask = (task) => instance.post(`${API_BASE_URL}/tasks`, task);
export const updateTask = (task) => instance.put(`${API_BASE_URL}/tasks`, task);
export const deleteTask = (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.data.authorities.includes('ROLE_ADMIN')) {
    return instance.delete(`${API_BASE_URL}/tasks/${id}`);
  } else {
    toast.error('Sadece yöneticiler görevleri silebilir.');
    return Promise.reject('Only admins can delete tasks');
  }
};
export const addLabelToTask = (taskId, labelId) => instance.post(`${API_BASE_URL}/tasks/${taskId}/labels/${labelId}`);

export const registerUser = (user) => axios.post(`${API_BASE_URL}/register`, user);
export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/login`, credentials);