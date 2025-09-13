import axios from "axios";

const API_URL = "http://localhost:8089/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
})

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const { token } = JSON.parse(storedUser);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
