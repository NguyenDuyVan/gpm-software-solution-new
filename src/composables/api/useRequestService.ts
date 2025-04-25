import type { AxiosResponse } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN_NAME } from './constants';

export const useRequestService = () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor to include the token in headers
  axiosInstance.interceptors.request.use(config => {
    const token = Cookies.get(TOKEN_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleUnauthorizedError = () => {
    Cookies.remove(TOKEN_NAME);
    localStorage.removeItem('AUTH_CACHE');
    document.location.href = '/login';
  };

  const httpGetAsync = async (url: string): Promise<AxiosResponse | null> => {
    try {
      const resp = await axiosInstance.get(url);
      return resp;
    } catch (error: any) {
      if (error.message.includes('401')) {
        handleUnauthorizedError();
      }
      return null;
    }
  };

  const httpPostAsync = async (url: string, data?: string): Promise<AxiosResponse | null> => {
    try {
      const resp = await axiosInstance.post(url, data);
      return resp;
    } catch (error: any) {
      if (error.message.includes('401')) {
        handleUnauthorizedError();
      }
      return null;
    }
  };
  return {
    httpGetAsync,
    httpPostAsync,
  };
};
