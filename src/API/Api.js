import axios from "axios";

const API_URL = 'https://localhost:7102/api';
const api= axios.create({
    baseURL: API_URL,
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  
  export default api;