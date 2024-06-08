import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api';


export const getLabels = () => axios.get(`${API_BASE_URL}/labels`);
export const getLabelById = (id) => axios.get(`${API_BASE_URL}/labels/${id}`);
export const addLabel = (label) => axios.post(`${API_BASE_URL}/labels`, label);
export const updateLabel = (label) => axios.put(`${API_BASE_URL}/labels`, label);
export const deleteLabel = (id) => axios.delete(`${API_BASE_URL}/labels/${id}`);
export const getAllLabelsByTaskId = (id) => axios.get(`${API_BASE_URL}/labels/getAllLabelsByTaskId/${id}`);

export const getAllTasksByLabelId = (labelId) => axios.get(`${API_BASE_URL}/labels/${labelId}`);
export const getTasks = () => axios.get(`${API_BASE_URL}/tasks`);
export const getTaskById = (id) => axios.get(`${API_BASE_URL}/tasks/${id}`);
export const addTask = (task) => axios.post(`${API_BASE_URL}/tasks`, task);
export const updateTask = (task) => axios.put(`${API_BASE_URL}/tasks`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`);
export const addLabelToTask = (taskId, labelId) => axios.post(`${API_BASE_URL}/tasks/${taskId}/labels/${labelId}`);

export const registerUser = (user) => axios.post(`${API_BASE_URL}/register`, user);
export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/login`, credentials);