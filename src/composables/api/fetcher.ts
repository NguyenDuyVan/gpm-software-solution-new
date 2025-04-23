import axios from 'axios';

let toast: ReturnType<typeof useToast> | null = null;

export const setGlobalToast = (t: ReturnType<typeof useToast>) => {
  toast = t;
};

const api = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_BASE,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res.data,
  err => {
    // Có thể xử lý lỗi toàn cục ở đây
    const message = err.message || 'Network Error';
    if (err?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }

    if (toast) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,

        life: 3000,
      });
    }

    return Promise.reject(err.response?.data || err.message);
  }
);

type ResponseType<T> = {
  data: T;
  status: number;
};

export const appFetcher = async <T>(url: string, config = {}) => {
  try {
    return (await api.get<ResponseType<T>>(url, config)).data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  }
};

export const appPoster = async <T>(url: string, data?: T, config = {}) => {
  try {
    return (await api.post<T>(url, data, config)).data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  }
};

export const appPutter = async <T>(url: string, data?: T, config = {}) => {
  try {
    return (await api.put<T>(url, data, config)).data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  }
};

export const appDeleter = async <T>(url: string, config = {}) => {
  try {
    return (await api.delete<T>(url, config)).data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  }
};
