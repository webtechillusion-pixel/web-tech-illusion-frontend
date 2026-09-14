const DEFAULT_API_BASE_URL = 'https://web-tech-illusion-backend.onrender.com';
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const normalizeBaseUrl = (value) => {
  const raw = (value || '').trim();
  if (!raw) return DEFAULT_API_BASE_URL;
  return raw.replace(/\/+$/, '');
};

export const API_BASE_URL = normalizeBaseUrl(
  configuredApiUrl && !configuredApiUrl.includes('ondigitalocean.app')
    ? configuredApiUrl
    : DEFAULT_API_BASE_URL
);

export const buildApiUrl = (path = '') => {
  const cleanPath = String(path || '').replace(/^\/+/, '');
  if (!cleanPath) return API_BASE_URL;
  return `${API_BASE_URL}/${cleanPath}`;
};

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: buildApiUrl('api/auth/login'),
      verify: buildApiUrl('api/auth/verify')
    },
    contact: {
      create: buildApiUrl('api/contact'),
      getAll: buildApiUrl('api/contact'),
      updateStatus: (id) => buildApiUrl(`api/contact/${id}/status`)
    },
    newsletter: {
      subscribe: buildApiUrl('api/newsletter/subscribe'),
      getAll: buildApiUrl('api/newsletter')
    }
  }
};

export default apiConfig;