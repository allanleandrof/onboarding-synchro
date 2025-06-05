import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços da API
export const contaAPI = {
  
  create: (data) => api.post('/conta', data),
  
  getById: (id) => api.get(`/conta/${id}`),
  
  getAll: () => api.get('/conta'),
  
  update: (id, data) => api.put(`/conta/${id}`, data),
  
  delete: (id) => api.delete(`/conta/${id}`)
};

export const historicoAPI = {
  getAll: () => api.get('/historico')
};

export default api;