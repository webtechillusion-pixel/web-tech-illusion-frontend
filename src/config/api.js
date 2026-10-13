const LIVE_BACKEND_URL = 'https://web-tech-illusion-backend.onrender.com';

const resolveApiBaseUrl = () => {
  const configured = (import.meta.env.VITE_API_URL || '').trim();
  // If not configured, or pointing to dead DigitalOcean backend, fallback to live Render backend
  if (!configured || configured.includes('ondigitalocean.app')) {
    return LIVE_BACKEND_URL;
  }
  return configured.replace(/\/+$/, '');
};

const API_BASE_URL = resolveApiBaseUrl();

export { API_BASE_URL };

export const buildApiUrl = (path = '') => {
  if (!path) return API_BASE_URL;
  const cleanPath = String(path).startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

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
