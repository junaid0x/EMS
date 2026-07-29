import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_BASE_URL?.trim() || "";

const api = axios.create({
  baseURL: configuredBaseUrl
    ? `${configuredBaseUrl.replace(/\/$/, "")}/api`
    : "/api"
});

// Attach auth token to all network requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;