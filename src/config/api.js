const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://web-tech-illusion-backend.onrender.com').replace(/\/$/, '');

export { API_BASE_URL };

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/api/auth/login`,
      verify: `${API_BASE_URL}/api/auth/verify`
    },
    contact: {
      create: `${API_BASE_URL}/api/contact`,
      getAll: `${API_BASE_URL}/api/contact`,
      updateStatus: (id) => `${API_BASE_URL}/api/contact/${id}/status`
    },
    newsletter: {
      subscribe: `${API_BASE_URL}/api/newsletter/subscribe`,
      getAll: `${API_BASE_URL}/api/newsletter`
    }
  }
};

export default apiConfig;
